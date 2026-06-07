import {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";

import { cn } from "@/utils/cn";

interface CameraComponentProps {
  onError?: (errorMessage: string | null) => void;
  className?: string;
  audio?: boolean;
}

export interface CameraHandle {
  video: HTMLVideoElement | null;
}

const CameraComponent = forwardRef<CameraHandle, CameraComponentProps>(
  (props, ref) => {
    const { onError, className, audio = false } = props;
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    useImperativeHandle(ref, () => ({
      video: videoRef.current,
    }));

    useEffect(() => {
      const startCamera = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720 },
            audio,
          });
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        } catch (err) {
          const msg = "카메라 권한을 허용해주세요.";
          console.error(err);
          setError(msg);
          onError?.(msg);
        }
      };

      startCamera();

      // audio는 마운트 시점에만 적용되므로 의도적으로 의존성에서 제외

      return () => {
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
      };
    }, [onError]);

    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl bg-black",
          className,
        )}
      >
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-full object-contain"
        />
        {error && (
          <p className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-center p-4">
            {error}
          </p>
        )}
      </div>
    );
  },
);

CameraComponent.displayName = "CameraComponent";
export default CameraComponent;
