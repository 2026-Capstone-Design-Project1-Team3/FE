import { StatsCard } from "@/shared/ui/Card/StatsCard/StatsCard";
import {
  statsCalc,
  type StatsRecord,
} from "@/shared/ui/MainSection/StatsSection/statsCalc";

interface StateSectionProps {
  records?: StatsRecord[];
}

export const StatsSection = ({ records }: StateSectionProps) => {
  const stats = records && records.length > 0 ? statsCalc(records) : null;

  return (
    <div className="flex flex-col  gap-1 px-40 py-20 bg-gray-100">
      <header className="pb-5 font-semibold text-xl w-20">최근 통계</header>

      <section className="flex justify-center items-center sm:grid-cols-2 lg:grid-cols-3 gap-5 p-6 py-20 w-full">
        <StatsCard
          title="시선 처리 점수"
          score={stats?.gazeAvgScore ?? "--"}
          unit="점"
          description="시선 처리에 대한 전반적인 평가 점수입니다."
        />
        <StatsCard
          title="발화 유창성"
          score={stats?.fluencyAvgLabel ?? "--"}
          description="말하기의 매끄러움과 흐름에 대한 지표입니다."
        />
        <StatsCard
          title="말하기 속도 점수"
          score={stats?.speedAvgScore ?? "--"}
          unit="점"
          description="말하기 속도의 적절성을 평가한 점수입니다."
        />
      </section>
    </div>
  );
};
