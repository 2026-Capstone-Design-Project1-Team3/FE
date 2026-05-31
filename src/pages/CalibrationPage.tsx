import { type FC, useCallback, useEffect, useRef, useState } from "react";

import { useNavigate, useSearchParams } from "react-router-dom";

import { useSendCalibrationChunkMutation } from "@/features/user/model/useSendCalibrationChunkMutation";
import { useUserEyeQuery } from "@/features/user/model/useUserEyeQuery";
import CameraComponent, {
  type CameraHandle,
} from "@/shared/ui/CameraComponent/CameraComponent";
import { Modal } from "@/shared/ui/Modal/Modal";

export interface CalibrationPageProps {
  sec?: number;
}

const RECORDER_MIME_TYPES = ["video/webm;codecs=vp8", "video/webm"];

const wait = (durationMs: number) =>
  new Promise((resolve) => window.setTimeout(resolve, durationMs));

const blobToBase64 = (blob: Blob) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const result = reader.result;
      if (typeof result === "string") resolve(result.split(",")[1] ?? "");
      else reject(new Error("영상 변환에 실패했습니다."));
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(blob);
  });

const recordCalibrationVideo = (stream: MediaStream, durationMs: number) =>
  new Promise<string>((resolve, reject) => {
    const mimeType = RECORDER_MIME_TYPES.find(MediaRecorder.isTypeSupported);
    const recorder = new MediaRecorder(
      stream,
      mimeType ? { mimeType } : undefined,
    );
    const chunks: Blob[] = [];

    recorder.ondataavailable = ({ data }) => data.size && chunks.push(data);
    recorder.onerror = () =>
      reject(new Error("캘리브레이션 영상 녹화에 실패했습니다."));
    recorder.onstop = async () => {
      try {
        resolve(
          await blobToBase64(new Blob(chunks, { type: recorder.mimeType })),
        );
      } catch (error) {
        reject(error);
      }
    };

    recorder.start();
    window.setTimeout(() => {
      if (recorder.state !== "inactive") recorder.stop();
    }, durationMs);
  });

const CalibrationPage: FC<CalibrationPageProps> = ({ sec = 5 }) => {
  const cameraRef = useRef<CameraHandle>(null);
  const [countdown, setCountdown] = useState(sec);
  const [isRecording, setIsRecording] = useState(false);
  const [activeModal, setActiveModal] = useState<"complete" | "fail" | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { data: eye } = useUserEyeQuery();
  const { isPending, mutateAsync } = useSendCalibrationChunkMutation();

  const eyeOffset = eye ?? { leftEyeOffset: 0, ratio: 0, rightEyeOffset: 0 };
  const folderId = searchParams.get("folderId") ?? "calibration";
  const progress = ((sec - countdown) / sec) * 100;
  const isProcessing = isRecording || isPending;
  const progressWidth = isRecording
    ? progress
    : activeModal === "complete"
      ? 100
      : 0;
  const startButtonText = errorMessage
    ? errorMessage
    : isProcessing
      ? "촬영 중"
      : activeModal === "complete"
        ? "다시 촬영하기"
        : "촬영하기";
  const handleCameraError = useCallback((msg: string | null) => {
    setErrorMessage(msg ? "권한 설정 필요" : "");
  }, []);

  useEffect(() => {
    if (!isRecording || countdown === 0) return;

    const interval = window.setInterval(() => {
      setCountdown((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => window.clearInterval(interval);
  }, [countdown, isRecording]);

  const handleStart = async () => {
    const stream = cameraRef.current?.video?.srcObject;
    const token = localStorage.getItem("accessToken");

    if (!(stream instanceof MediaStream)) {
      setErrorMessage("권한 설정 필요");
      return;
    }

    if (!token) {
      setErrorMessage("로그인 필요");
      return;
    }

    setCountdown(sec);
    setIsRecording(true);
    setActiveModal(null);
    setErrorMessage("");

    try {
      const durationMs = sec * 1000;
      const [videoData] = await Promise.all([
        recordCalibrationVideo(stream, durationMs),
        wait(durationMs),
      ]);

      await mutateAsync({
        eye: eyeOffset,
        folderId,
        token,
        type: "CALIBRATION_CHUNK",
        videoData,
      });
      setActiveModal("complete");
    } catch {
      setActiveModal("fail");
    } finally {
      setIsRecording(false);
    }
  };

  const handleModalClose = () => {
    setActiveModal(null);
    navigate("/my");
  };
  const closeFailModal = () => setActiveModal(null);

  return (
    <main className="overflow-hidden">
      <div className="py-8 text-center">
        <h1 className="text-subtitle-02">시선 캘리브레이션</h1>
        <p className="text-body-01">
          카메라 정중앙을 바라본 상태로 5초 동안 촬영해주세요.
        </p>
      </div>
      <div className="relative mx-auto w-fit">
        <CameraComponent
          ref={cameraRef}
          onError={handleCameraError}
          className="h-100 w-200"
        />
        <div className="text-subtitle-05 absolute top-6 right-6 flex h-7 w-14 items-center justify-center rounded-lg bg-gray-700 text-white">
          0{countdown} sec
        </div>
      </div>

      <section className="flex flex-col items-center py-5">
        <div className="w-200 rounded-xl border border-gray-200 bg-gray-100 p-4">
          <div className="flex gap-4">
            <div className="bg-primary-900/20 h-10 w-10 rounded-md p-1.5">
              <h1 className="text-subtitle-03 bg-primary-900 h-7 w-7 rounded-full p-1 text-center text-white">
                i
              </h1>
            </div>
            <div>
              <h1 className="text-subtitle-03">안내사항</h1>
              <p className="text-caption-01">
                촬영 중에는 고개를 크게 움직이지 말고 카메라 렌즈를
                바라봐주세요.
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center px-4 py-5">
          <div className="h-2 w-200 overflow-hidden rounded-full bg-gray-600/30">
            <div
              className="bg-secondary-900 h-full rounded-2xl"
              style={{
                width: `${progressWidth}%`,
                transition: "width 300ms ease-out",
              }}
            />
          </div>
        </div>
        <div className="flex justify-center gap-5 py-5">
          <button
            onClick={() => navigate("/my")}
            disabled={isProcessing}
            className="cursor-pointer w-48 rounded-xl border-2 border-gray-700 py-2 text-gray-700 hover:bg-gray-700 hover:text-white"
          >
            취소
          </button>
          <button
            disabled={isProcessing || errorMessage === "권한 설정 필요"}
            className="border-secondary-900 bg-secondary-900 hover:border-secondary-800 hover:bg-secondary-800 cursor-pointer rounded-xl border-2 w-48 py-3 text-white disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
            onClick={handleStart}
          >
            {startButtonText}
          </button>
        </div>
      </section>
      <Modal
        isOpen={activeModal === "complete"}
        variant="single"
        title="캘리브레이션 완료"
        description={
          "시선 추적 캘리브레이션 영상 촬영이\n성공적으로 완료되었습니다."
        }
        confirmText="확인"
        onClose={handleModalClose}
        onConfirm={handleModalClose}
      />
      <Modal
        isOpen={activeModal === "fail"}
        variant="single"
        title="전송 실패"
        description="캘리브레이션 영상 전송에 실패했습니다. 잠시 후 다시 시도해주세요."
        confirmText="확인"
        onClose={closeFailModal}
        onConfirm={closeFailModal}
      />
    </main>
  );
};

export default CalibrationPage;
