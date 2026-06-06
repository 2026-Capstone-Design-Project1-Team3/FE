import { useEffect, useRef } from "react";

const MIME_TYPES = ["video/webm;codecs=vp8", "video/webm"];

export const useFullRecording = (videoEl: HTMLVideoElement | null) => {
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!videoEl) return;

    let cleared = false;

    const tryStart = () => {
      const stream = videoEl.srcObject;
      if (!(stream instanceof MediaStream)) return false;

      const mimeType = MIME_TYPES.find(MediaRecorder.isTypeSupported);
      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined,
      );
      chunksRef.current = [];
      recorder.ondataavailable = ({ data }) => {
        if (data.size > 0) chunksRef.current.push(data);
      };
      recorder.start(1000);
      recorderRef.current = recorder;
      return true;
    };

    if (!tryStart()) {
      const interval = setInterval(() => {
        if (cleared) {
          clearInterval(interval);
          return;
        }
        if (tryStart()) clearInterval(interval);
      }, 100);
    }

    return () => {
      cleared = true;
      const rec = recorderRef.current;
      if (rec && rec.state !== "inactive") rec.stop();
    };
  }, [videoEl]);

  const stopAndGetBlob = (): Promise<Blob> =>
    new Promise((resolve, reject) => {
      const recorder = recorderRef.current;
      if (!recorder || recorder.state === "inactive") {
        reject(new Error("녹화 중이 아닙니다."));
        return;
      }
      recorder.onstop = () => {
        resolve(
          new Blob(chunksRef.current, {
            type: recorder.mimeType || "video/webm",
          }),
        );
      };
      recorder.stop();
    });

  return { stopAndGetBlob };
};
