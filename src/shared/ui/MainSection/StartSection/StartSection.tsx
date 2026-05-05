import type { FC } from "react";

import { SquareArrowUp, Mic } from "lucide-react";

import { StartCard } from "@/shared/ui/Card/StartCard/StartCard";

interface StartSectionProps {
  className?: string;
}

export const StartSection: FC<StartSectionProps> = (props) => {
  const { className } = props;
  return (
    <section className={className}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <StartCard
          bgColor="bg-primary-900/20"
          Icon={SquareArrowUp}
          IconClass="bg-primary-900/30 text-primary-900"
          title="발표 연습"
          description={
            "실제 청중 앞에서 말하는 듯한 시뮬레이션 환경을 제공합니다. \n시선 처리, 목소리 톤, 속도를 AI가 정밀 분석합니다."
          }
          buttonText="시작하기"
          buttonClass="text-primary-800"
        />
        <StartCard
          bgColor="bg-secondary-900/20"
          Icon={Mic}
          IconClass="bg-secondary-900/30 text-secondary-900"
          title="면접 연습"
          description={
            "직무 맞춤형 예상 질문에 답하고 즉각적인 피드백을 받아보세요. \n답변의 논리성과 비언어적 표현을 코칭합니다."
          }
          buttonText="시작하기"
          buttonClass="text-secondary-800"
        />
      </div>
    </section>
  );
};
