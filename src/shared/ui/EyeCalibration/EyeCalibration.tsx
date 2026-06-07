import type { FC } from "react";

import { CircleAlert, CircleCheck, Video } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface EyeCalibrationProps {
  complete?: boolean;
  completeAt?: string;
  className?: string;
}

export const EyeCalibration: FC<EyeCalibrationProps> = (props) => {
  const { complete = false, className } = props;
  const StatusIcon = complete ? CircleCheck : CircleAlert;
  const navigation = useNavigate();
  const handleGoToCalibration = () => {
    navigation("/my/calibration");
  };
  return (
    <section className={className}>
      <span className="text-head-03 flex items-center gap-4">
        <StatusIcon
          size={24}
          className="border-secondary-900 text-secondary-900 h-10 w-10 rounded-full border-8"
        />
        시선 캘리브레이션 {complete ? "완료" : "미완료"}
      </span>
      <div className="py-5">
        <div className="text-body-01 border-secondary-700 bg-secondary-900/20 rounded-xl border p-5">
          <p>
            {complete
              ? "정상적으로 캘리브레이션 되었습니다."
              : "아직 카메라 캘리브레이션이 완료되지 않았습니다.\n 정확한 AI 분석을 위해 연습 전 캘리브레이션을 진행해주세요."}
          </p>
        </div>
      </div>
      <p className="text-body-01 pb-10 text-gray-600">
        {complete
          ? "AI 모델이 귀하의 관절과 움직임을 정확하게 감지하고 있습니다. 주변 환경이나 촬영 위치가 크게 바뀐 경우에만 재보정을 권장합니다."
          : "AI 모델이 귀하의 관절과 움직임을 정확하게 감지하기 위해서는 표준 위치 설정이 필요합니다. 약 5초간 정면을 응시하는 간단한 촬영이 진행됩니다."}
      </p>
      <button
        onClick={handleGoToCalibration}
        className="text-body-01 bg-secondary-900 hover:bg-secondary-800 border-secondary-900 hover:border-secondary-800 flex h-15 w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-5 text-white hover:border-2"
      >
        <Video size={24} />
        {complete ? "재촬영하기" : "촬영하기"}
      </button>
    </section>
  );
};
