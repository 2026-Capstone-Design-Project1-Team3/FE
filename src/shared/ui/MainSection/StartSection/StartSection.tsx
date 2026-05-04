import type { FC } from "react";

import { Presentation, MessagesSquare } from "lucide-react";

import InterviewImage from "@/assets/interview.png";
import PresentationImage from "@/assets/presentation.png";
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
          bgImage={PresentationImage}
          Icon={Presentation}
          IconClass="bg-primary-600/50 text-primary-900"
          title="면접 연습"
          description={
            "직무 맞춤형 예상 질문에 답하고 즉각적인 피드백을 받아보세요. \n답변의 논리성과 비언어적 표현을 코칭합니다."
          }
          buttonText="시작하기"
          buttonClass="text-primary-800"
        />
        <StartCard
          bgImage={InterviewImage}
          Icon={MessagesSquare}
          IconClass="bg-secondary-600/50 text-secondary-900"
          title="발표 연습"
          description={
            "실제 청중 앞에서 말하는 듯한 시뮬레이션 환경을 제공합니다. \n시선 처리, 목소리 톤, 속도를 AI가 정밀 분석합니다."
          }
          buttonText="시작하기"
          buttonClass="text-secondary-800"
        />
      </div>
    </section>
  );
};
