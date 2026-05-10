import { type FC, useEffect, useState, useCallback } from "react";

import { useNavigate } from "react-router-dom";

import CameraComponent from "@/shared/ui/CameraComponent/CameraComponent";

export interface CalibrationPageProps {
  sec?: number;
}

const CalibrationPage: FC<CalibrationPageProps> = (props) => {
  const { sec = 5 } = props;
  const [countdown, setCountdown] = useState(sec);
  const [isActive, setIsActive] = useState(false);
  const [complete, setComplete] = useState(false);
  const [hasError, setHasError] = useState(false);
  const navigation = useNavigate();

  const progress = ((sec - countdown) / sec) * 100;

  const handleCameraError = useCallback((msg: string | null) => {
    setHasError(!!msg);
  }, []);

  useEffect(() => {
    if (!isActive) return;

    if (countdown === 0) {
      const timer = setTimeout(() => {
        setIsActive(false);
        setComplete(true);
      }, 800);

      return () => clearTimeout(timer);
    }

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isActive, countdown]);

  const handleStart = () => {
    setCountdown(sec);
    setIsActive(true);
  };

  const handleGoToMyPage = () => {
    navigation("/mypage");
  };
  return (
    <main className="overflow-hidden">
      <div className="py-8 text-center">
        <h1 className="text-subtitle-02">시선 캘리브레이션</h1>
        <p className="text-body-01">
          카메라 정중앙을 바라본 상태로 5초 동안 촬영해주세요.
        </p>
      </div>
      <div className="relative mx-auto w-fit">
        <CameraComponent onError={handleCameraError} />
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
                width: `${isActive ? progress : complete ? 100 : 0}%`,
                transition: "width 300ms ease-out",
              }}
            />
          </div>
        </div>
        <div className="flex justify-center gap-5 py-5">
          <button
            onClick={handleGoToMyPage}
            disabled={isActive}
            className="cursor-pointer rounded-xl border-2 border-gray-700 px-15 py-2 text-gray-700 hover:bg-gray-700 hover:text-white"
          >
            취소
          </button>
          <button
            onClick={handleStart}
            disabled={isActive || hasError}
            className="border-secondary-900 bg-secondary-900 hover:border-secondary-800 hover:bg-secondary-800 cursor-pointer rounded-xl border-2 px-15 py-2 text-white disabled:bg-gray-400 disabled:border-gray-400 disabled:cursor-not-allowed"
          >
            {hasError
              ? "권한 설정 필요"
              : isActive
                ? "촬영 중"
                : complete
                  ? "다시 촬영하기"
                  : "촬영하기"}
          </button>
        </div>
      </section>
    </main>
  );
};

export default CalibrationPage;
