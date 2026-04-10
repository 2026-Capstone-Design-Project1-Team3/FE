import { StartCard } from "@/shared/ui/Card/StartCard/StartCard";

export const StartSection = () => {
  return (
    <section className="flex flex-row items-center justify-center gap-30 p-6 py-20 bg-gray-100 max-h-180 w-full overflow-x-auto">
      <StartCard
        variant="interview"
        title="AI 모의 면접"
        description="AI 분석을 통한 적중 예상 질문과 정교한 꼬리질문을 제공합니다."
        buttonText="면접 준비하기"
      />
      <StartCard
        variant="presentation"
        title="AI 모의 발표"
        description="사용자 맞춤형 최적화 대본 생성과 정교한 실시간 피드백 솔루션을 제공합니다."
        buttonText="발표 준비하기"
      />
    </section>
  );
};
