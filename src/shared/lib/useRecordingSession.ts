import { useEffect, useRef, useState } from "react";

import type { SpeedStatus } from "@/shared/ui/RecordSection/SpeedCard/SpeedCard";

const AI_WS_BASE_URL = (import.meta.env.VITE_AI_WS_BASE_URL ?? "").trim();
const CHUNK_DURATION_MS = 20_000;
const MIME_TYPES = ["video/webm;codecs=vp8", "video/webm"];

interface EyeCalibration {
  leftEyeOffset: number;
  rightEyeOffset: number;
  ratio: number;
}

interface UseRecordingSessionOptions {
  videoEl: HTMLVideoElement | null;
  folderId: string | null;
  token: string;
  eye: EyeCalibration;
}

// speedScore: 0 → normal(좋음), 1 → fast(빠름), 2 → slow(느림)
const toSpeedStatus = (score: number): SpeedStatus => {
  if (score === 1) return "fast";
  if (score === 2) return "slow";
  return "normal";
};

const blobToBase64 = (blob: Blob): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") {
        const base64 = (result.split(";base64,")[1] ?? "").replace(/\s/g, "");
        console.log(
          "[base64] 길이:",
          base64.length,
          "앞10:",
          base64.slice(0, 10),
          "뒤10:",
          base64.slice(-10),
        );
        resolve(base64);
      } else reject(new Error("영상 변환 실패"));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

export const useRecordingSession = ({
  videoEl,
  folderId,
  token,
  eye,
}: UseRecordingSessionOptions) => {
  const [speedStatus, setSpeedStatus] = useState<SpeedStatus>("normal");
  const [spsScore, setSpsScore] = useState<number | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const startTimeRef = useRef<number>(0);

  // WebSocket 연결
  useEffect(() => {
    if (!folderId || !token) return;

    const url = new URL("/ws/analysis", AI_WS_BASE_URL);
    url.search = new URLSearchParams({
      folderId,
      token,
      leftEyeOffset: String(eye.leftEyeOffset),
      rightEyeOffset: String(eye.rightEyeOffset),
      ratio: String(eye.ratio),
    }).toString();

    const ws = new WebSocket(url.toString());
    wsRef.current = ws;
    startTimeRef.current = Date.now();

    ws.onopen = () => {
      console.log("[WS] 연결됨");
      setIsConnected(true);
    };
    ws.onclose = () => {
      console.log("[WS] 연결 종료");
      if (wsRef.current === ws) {
        setIsConnected(false);
        wsRef.current = null;
      }
    };
    ws.onerror = () => setIsConnected(false);
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data as string) as {
          type: string;
          speedScore: { speedScore: number; spsScore: number } | number;
          spsScore?: number;
        };
        if (data.type === "SPEED_RESULT") {
          const scoreObj = data.speedScore;
          if (typeof scoreObj === "object") {
            setSpeedStatus(toSpeedStatus(scoreObj.speedScore));
            setSpsScore(scoreObj.spsScore ?? null);
          } else {
            setSpeedStatus(toSpeedStatus(scoreObj));
            setSpsScore(data.spsScore ?? null);
          }
        }
      } catch {
        // 파싱 실패 무시
      }
    };

    return () => ws.close();
    // eye 값은 연결 시점에만 사용하므로 의도적으로 의존성에서 제외
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [folderId, token]);

  // 20초 단위 영상 청크 녹화 및 전송
  useEffect(() => {
    if (!isConnected || !videoEl) return;

    const stream = videoEl.srcObject;
    if (!(stream instanceof MediaStream)) return;

    console.log("[청크] 녹화 시작 - 20초 후 첫 전송");

    const mimeType = MIME_TYPES.find(MediaRecorder.isTypeSupported);

    const sendChunk = () => {
      const ws = wsRef.current;
      if (!ws || ws.readyState !== WebSocket.OPEN) return;

      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      const chunks: Blob[] = [];

      recorder.ondataavailable = ({ data }) => {
        if (data.size > 0) chunks.push(data);
      };

      recorder.onstop = async () => {
        const activeWs = wsRef.current;
        if (!activeWs || activeWs.readyState !== WebSocket.OPEN) return;
        try {
          const blob = new Blob(chunks, { type: recorder.mimeType });
          const videoData = await blobToBase64(blob);
          const currentTime = Date.now() - startTimeRef.current;
          console.log("[청크] 전송 완료 - currentTime:", currentTime);
          activeWs.send(
            JSON.stringify({ type: "VIDEO_CHUNK", currentTime, videoData }),
          );
        } catch {
          // 전송 실패 무시
        }
      };

      recorder.start();
      setTimeout(() => {
        if (recorder.state !== "inactive") recorder.stop();
      }, CHUNK_DURATION_MS);
    };

    sendChunk();
    const interval = setInterval(sendChunk, CHUNK_DURATION_MS);

    return () => clearInterval(interval);
  }, [isConnected, videoEl]);

  return { speedStatus, spsScore, isConnected };
};
