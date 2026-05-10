import { type FC, useEffect, useRef, useState } from "react";

interface CameraComponentProps {
  onError?: (errorMessage: string | null) => void;
}

const CameraComponent: FC<CameraComponentProps> = (props) => {
  const { onError } = props;
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: 1280, height: 720 },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        const msg = "카메라 권한을 허용해주세요.";
        console.error("카메라를 가져오는데 실패했습니다:", err);
        setError(msg);
        onError?.(msg);
      }
    };

    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, [onError]);

  return (
    <section className="p-4">
      <div className="flex flex-col items-center gap-4">
        <div className="relative aspect-video w-full max-w-2xl overflow-hidden rounded-2xl bg-slate-950 shadow-xl">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="transition-filter h-full w-full object-cover grayscale-0 duration-500"
          />

          {/* 에러 오버레이: 글래스모피즘 스타일 적용 */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm">
              <p className="rounded-lg border border-red-500/50 bg-red-500/20 px-4 py-2 text-sm font-medium text-white">
                {error}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CameraComponent;
