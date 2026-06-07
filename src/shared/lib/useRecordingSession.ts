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
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const stoppedRef = useRef(false);
  const pendingStopRef = useRef(false);
  const currentRecorderRef = useRef<MediaRecorder | null>(null);

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
      currentRecorderRef.current = recorder;
      const chunks: Blob[] = [];

      recorder.ondataavailable = ({ data }) => {
        if (data.size > 0) chunks.push(data);
      };

      recorder.onstop = async () => {
        const activeWs = wsRef.current;
        if (activeWs && activeWs.readyState === WebSocket.OPEN) {
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
        }
        currentRecorderRef.current = null;
        // 종료 대기 중이었으면 전송 후 WS 닫기
        if (pendingStopRef.current) {
          wsRef.current?.close();
        }
      };

      recorder.start();
      setTimeout(() => {
        if (recorder.state !== "inactive") recorder.stop();
      }, CHUNK_DURATION_MS);
    };

    if (stoppedRef.current) return;

    sendChunk();
    intervalRef.current = setInterval(() => {
      if (stoppedRef.current) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        return;
      }
      sendChunk();
    }, CHUNK_DURATION_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isConnected, videoEl]);

  const stop = () => {
    stoppedRef.current = true;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    const recorder = currentRecorderRef.current;
    if (recorder && recorder.state !== "inactive") {
      // 현재 녹화 중인 청크가 있으면 즉시 stop → onstop에서 전송 후 WS 닫힘
      pendingStopRef.current = true;
      recorder.stop();
    } else {
      // 녹화 중인 청크 없으면 바로 WS 닫기
      wsRef.current?.close();
    }
  };

  return { speedStatus, spsScore, isConnected, stop };
};
