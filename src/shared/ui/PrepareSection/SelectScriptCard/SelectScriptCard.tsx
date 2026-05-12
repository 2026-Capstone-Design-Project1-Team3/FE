import { useState } from "react";

import { Sparkles, Upload } from "lucide-react";

type ScriptMethodType = "auto" | "manual";

interface ScriptOptionCardProps {
  method: ScriptMethodType;
  isSelected: boolean;
  onClick: () => void;
}

const ScriptOptionCard = ({
  method,
  isSelected,
  onClick,
}: ScriptOptionCardProps) => {
  const isAuto = method === "auto";

  const title = isAuto ? "PPT 기반 대본 자동 생성 (추천)" : "대본 직접 업로드";
  const description = isAuto
    ? "AI가 업로드한 PPT 내용을 분석하여 최적의 발표 대본을 자동으로 구성합니다."
    : "준비된 대본 파일이 있는 경우 텍스트를 직접 붙여넣어 사용합니다.";

  const Icon = isAuto ? Sparkles : Upload;
  const cardBorderClass = isSelected
    ? "border-primary-900"
    : "border-border-default hover:border-border-strong";

  const cardBgClass = isSelected ? "bg-primary-50" : "bg-background-light";

  const iconBgClass = isSelected ? "bg-primary-800" : "bg-gray-100";

  const iconColorClass = isSelected ? "text-white" : "text-text-tertiary";

  return (
    <div
      onClick={onClick}
      className={`flex flex-col flex-1 p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 text-left ${cardBorderClass} ${cardBgClass}`}
    >
      <div
        className={`flex items-center justify-center w-10 h-10 mb-4 rounded-full transition-colors ${iconBgClass} ${iconColorClass}`}
      >
        <Icon className="w-5 h-5" />
      </div>

      <h3 className="mb-2 text-subtitle-03 text-text-primary">{title}</h3>

      <p className="text-body-02 text-text-secondary break-keep">
        {description}
      </p>
    </div>
  );
};

export const SelectScriptCard = () => {
  const [selectedMethod, setSelectedMethod] = useState<ScriptMethodType | null>(
    null,
  );

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-subtitle-03 text-text-secondary">발표 대본 선택</h2>

      <div className="flex w-full gap-4">
        <ScriptOptionCard
          method="auto"
          isSelected={selectedMethod === "auto"}
          onClick={() => setSelectedMethod("auto")}
        />
        <ScriptOptionCard
          method="manual"
          isSelected={selectedMethod === "manual"}
          onClick={() => setSelectedMethod("manual")}
        />
      </div>
    </div>
  );
};
