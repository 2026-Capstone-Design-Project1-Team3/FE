import { useRef, useState } from "react";

import { getPresignedUrl } from "@/entities/file/api/getPresignedUrl";
import { uploadFileToPresignedUrl } from "@/entities/file/api/uploadFileToPresignedUrl";

export type AlarmStatus =
  | "idle"
  | "uploading"
  | "analyzing"
  | "complete"
  | "failed";

interface UseAnalysisAlarmOptions {
  folderId: string | null;
  type: number;
  title: string;
  token: string;
}

const API_BASE = (
  (import.meta.env.VITE_API_BASE_URL as string | undefined) ?? ""
).trim();

export const useAnalysisAlarm = ({
  folderId,
  type,
  title,
  token,
}: UseAnalysisAlarmOptions) => {
  const [status, setStatus] = useState<AlarmStatus>("idle");
  const [analysisId, setAnalysisId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const startAlarm = async (videoBlob: Blob) => {
    if (!folderId || !token) return;

    setStatus("uploading");
    setErrorMessage(null);

    try {
      // 1. presigned URL 발급
      const fileName = `recording_${Date.now()}.webm`;
      const { uploadUrl, fileKey } = await getPresignedUrl(fileName);
      if (!uploadUrl || !fileKey) throw new Error("presigned URL 발급 실패");

      // 2. S3 업로드
      const videoFile = new File([videoBlob], fileName, {
        type: videoBlob.type || "video/webm",
      });
      await uploadFileToPresignedUrl(uploadUrl, videoFile);

      // 3. SSE 알람 연결
      setStatus("analyzing");
      abortRef.current = new AbortController();

      const url = new URL(`${API_BASE}/analysis/alarm`);
      url.searchParams.set("fileKey", fileKey);
      url.searchParams.set("folderId", folderId);
      url.searchParams.set("type", String(type));
      url.searchParams.set("title", title);

      const response = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${token}` },
        signal: abortRef.current.signal,
      });

      if (!response.ok || !response.body) {
        throw new Error("알람 연결에 실패했습니다.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const blocks = buffer.split("\n\n");
        buffer = blocks.pop() ?? "";

        for (const block of blocks) {
          let event = "message";
          let data = "";
          for (const line of block.split("\n")) {
            if (line.startsWith("event:")) event = line.slice(6).trim();
            if (line.startsWith("data:")) data = line.slice(5).trim();
          }

          if (event === "ANALYSIS_COMPLETE") {
            try {
              const parsed = JSON.parse(data) as { id: string };
              setAnalysisId(parsed.id);
            } catch {
              setAnalysisId(data);
            }
            setStatus("complete");
            await reader.cancel();
            return;
          }

          if (event === "ANALYSIS_FAILED") {
            setErrorMessage(data || "분석에 실패했습니다.");
            setStatus("failed");
            await reader.cancel();
            return;
          }
        }
      }
    } catch (err) {
      if ((err as Error).name === "AbortError") return;
      console.error(err);
      setErrorMessage(
        "네트워크 연결이 끊겼습니다.\n분석은 백엔드에서 계속 진행 중일 수 있습니다.\n잠시 후 대시보드에서 결과를 확인해 주세요.",
      );
      setStatus("failed");
    }
  };

  const cancel = () => {
    abortRef.current?.abort();
    setStatus("idle");
  };

  return { status, analysisId, errorMessage, startAlarm, cancel };
};
