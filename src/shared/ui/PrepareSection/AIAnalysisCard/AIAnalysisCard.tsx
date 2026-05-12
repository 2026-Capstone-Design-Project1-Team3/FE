import React from "react";

import { Check, BrainCircuit, Sparkles, Newspaper } from "lucide-react";

export type StepStatus = "pending" | "loading" | "complete";

interface AIAnalysisCardProps {
  scanStatus?: StepStatus;
  generateStatus?: StepStatus;
  onStartAnalysis?: () => void;
}

export const AIAnalysisCard = ({
  scanStatus = "pending",
  generateStatus = "pending",
  onStartAnalysis,
}: AIAnalysisCardProps) => {
  const renderStatusIcon = (status: StepStatus, Icon: React.ElementType) => {
    if (status === "complete") {
      return (
        <div className="flex items-center justify-center w-9.5 h-9.5 bg-primary-800 border-2 border-primary-800 rounded-full shrink-0">
          <Check className="w-6.5 h-5.5 text-white" strokeWidth={3} />
        </div>
      );
    }
    if (status === "loading") {
      return (
        <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-primary-800 rounded-full shrink-0">
          <Icon className="w-5 h-5 text-primary-800 animate-pulse" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-10 h-10 bg-white border-2 border-gray-300 rounded-full shrink-0">
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
    );
  };

  const getTextColor = (status: StepStatus) => {
    if (status === "pending") return "text-gray-500";
    if (status === "loading") return "text-primary-800";
    return "text-gray-800";
  };

  return (
    <div className="flex flex-col w-full max-w-2xl p-6 bg-primary-100/60 rounded-xl">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-subtitle-02 text-gray-900">AI 분석 상태</h2>
        <button
          type="button"
          onClick={onStartAnalysis}
          className="flex items-center gap-1.5 px-3 py-1.5 text-caption-01 text-white transition-colors bg-primary-800 rounded-lg hover:bg-primary-900"
        >
          <Sparkles className="w-4 h-4" />
          <span className="pt-0.5">분석 시작하기</span>
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4 h-10">
          {renderStatusIcon(scanStatus, Newspaper)}
          <div className="flex flex-col justify-center h-full">
            <h3
              className={`text-label-01 leading-none ${getTextColor(scanStatus)}`}
            >
              {scanStatus === "pending"
                ? "문서 스캔 전"
                : scanStatus === "loading"
                  ? "문서 스캔 중..."
                  : "문서 스캔 완료"}
            </h3>
            {scanStatus === "complete" && (
              <p className="mt-1.5 text-label-04 text-gray-500 leading-none">
                자기소개서에서 핵심 키워드를 추출했습니다.
              </p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 h-10">
          {renderStatusIcon(generateStatus, BrainCircuit)}
          <div className="flex flex-col justify-center h-full">
            <h3
              className={`text-label-01 leading-none ${getTextColor(generateStatus)}`}
            >
              {generateStatus === "pending"
                ? "맞춤 질문 생성 전"
                : generateStatus === "loading"
                  ? "맞춤 질문 생성 중..."
                  : "맞춤 질문 생성 완료"}
            </h3>
            {generateStatus === "complete" && (
              <p className="mt-1.5 text-label-04 text-gray-500 leading-none">
                추출된 키워드를 바탕으로 맞춤형 질문이 준비되었습니다.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
