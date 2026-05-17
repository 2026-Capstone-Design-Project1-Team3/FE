import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { StatsSection } from "@/shared/ui/MainSection/StatsSection/StatsSection";

export const ReportPage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="p-8 py-10">
        <section className="pb-10">
          <h1 className="text-head-01 text-text-primary">분석 요약</h1>
          <p className="text-body-01 text-text-secondary">
            지난 30일간의 AI 코칭 성과 데이터입니다.
          </p>
        </section>
        <StatsSection />
        <div className="mb-4 flex justify-between pt-10">
          <div>
            <h2 className="text-head-03 text-text-primary">최근 발표 기록</h2>
          </div>

          <button
            className="text-label-04 -mb-2 flex min-w-20 cursor-pointer items-center gap-1 text-text-deactivated transition-all hover:gap-2 hover:text-text-secondary"
            onClick={() => navigate("/report/presentation")}
          >
            전체 보기
            <ChevronRight size={16} />
          </button>
        </div>
        <RecordSection filterVariant="presentation" count={3} />
        <div className="mb-4 flex justify-between pt-10">
          <div>
            <h2 className="text-head-03 text-text-primary">최근 면접 기록</h2>
          </div>

          <button
            className="text-label-04 -mb-2 flex min-w-20 cursor-pointer items-center gap-1 text-text-deactivated transition-all hover:gap-2 hover:text-text-secondary"
            onClick={() => navigate("/report/interview")}
          >
            전체 보기
            <ChevronRight size={16} />
          </button>
        </div>
        <RecordSection filterVariant="interview" count={3} />
      </div>
    </main>
  );
};

export default ReportPage;
