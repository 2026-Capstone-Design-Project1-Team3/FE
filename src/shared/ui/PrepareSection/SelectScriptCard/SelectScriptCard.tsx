import { useState } from "react";

import { Sparkles, Upload } from "lucide-react";

export type ScriptMethodType = "auto" | "manual";

interface ScriptOptionCardProps {
  method: ScriptMethodType;
  isSelected: boolean;
  onClick: () => void;
}

interface SelectScriptCardProps {
  selectedMethod?: ScriptMethodType | null;
  onMethodChange?: (method: ScriptMethodType) => void;
}

const ScriptOptionCard = ({
  method,
  isSelected,
  onClick,
}: ScriptOptionCardProps) => {
  const isAuto = method === "auto";
  const title = isAuto ? "PPT 기반 대본 자동 생성" : "대본 직접 입력";
  const description = isAuto
    ? "업로드한 발표 자료를 바탕으로 AI가 발표 대본을 생성합니다."
    : "이미 준비된 발표 대본을 직접 입력해서 사용합니다.";

  const Icon = isAuto ? Sparkles : Upload;
  const cardBorderClass = isSelected
    ? "border-primary-900"
    : "border-border-default hover:border-border-strong";
  const cardBgClass = isSelected ? "bg-primary-50" : "bg-background-light";
  const iconBgClass = isSelected ? "bg-primary-800" : "bg-gray-100";
  const iconColorClass = isSelected ? "text-white" : "text-text-tertiary";

  return (
    <button
      type="button"
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
    </button>
  );
};

export const SelectScriptCard = ({
  selectedMethod,
  onMethodChange,
}: SelectScriptCardProps = {}) => {
  const [internalMethod, setInternalMethod] = useState<ScriptMethodType | null>(
    null,
  );
  const currentMethod =
    selectedMethod !== undefined ? selectedMethod : internalMethod;

  const handleSelect = (method: ScriptMethodType) => {
    if (onMethodChange) {
      onMethodChange(method);
      return;
    }

    setInternalMethod(method);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-subtitle-03 text-text-secondary">발표 대본 선택</h2>

      <div className="flex w-full gap-4">
        <ScriptOptionCard
          method="auto"
          isSelected={currentMethod === "auto"}
          onClick={() => handleSelect("auto")}
        />
        <ScriptOptionCard
          method="manual"
          isSelected={currentMethod === "manual"}
          onClick={() => handleSelect("manual")}
        />
      </div>
    </div>
  );
};
