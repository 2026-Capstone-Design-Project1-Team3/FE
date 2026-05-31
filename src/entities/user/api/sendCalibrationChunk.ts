import type { SendCalibrationChunkPayload } from "@/entities/user/model/types";

type AnalysisSocketParams = Omit<
  SendCalibrationChunkPayload,
  "type" | "videoData"
>;

const AI_WS_BASE_URL = (import.meta.env.VITE_AI_WS_BASE_URL ?? "").trim();
const ANALYSIS_SOCKET_PATH = "/ws/analysis";

const createAnalysisSocketUrl = ({
  eye,
  folderId,
  token,
}: AnalysisSocketParams) => {
  if (!AI_WS_BASE_URL) throw new Error("AI WebSocket 주소가 없습니다.");

  const url = new URL(ANALYSIS_SOCKET_PATH, AI_WS_BASE_URL);
  url.search = new URLSearchParams({
    folderId,
    token,
    leftEyeOffset: String(eye.leftEyeOffset),
    rightEyeOffset: String(eye.rightEyeOffset),
    ratio: String(eye.ratio),
  }).toString();

  return url.toString();
};

export const sendCalibrationChunk = ({
  eye,
  folderId,
  token,
  type,
  videoData,
}: SendCalibrationChunkPayload) => {
  return new Promise<void>((resolve, reject) => {
    const socket = new WebSocket(
      createAnalysisSocketUrl({ eye, folderId, token }),
    );

    socket.onerror = () => reject(new Error("AI 서버 연결에 실패했습니다."));
    socket.onopen = () => {
      socket.send(JSON.stringify({ type, videoData }));
      socket.close();
      resolve();
    };
  });
};
