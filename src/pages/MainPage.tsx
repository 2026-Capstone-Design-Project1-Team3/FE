import type { FC } from "react";

import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { StartSection } from "@/shared/ui/MainSection/StartSection/StartSection";

interface MainPageProps {
  username?: string;
}
const MainPage: FC<MainPageProps> = (props) => {
  const { username } = props;
  const navigate = useNavigate();

  return (
    <div>
      <main>
        <div className="mx-auto max-w-6xl p-8">
          <section className="py-10">
            <h1 className="text-head-01 text-text-primary">
              {username || "사용자"}님, 안녕하세요!
            </h1>
            <h6 className="text-body-01 text-text-secondary">
              당신의 면접과 발표 역량을 한 단계 더 높여줄 AI 멘토가 준비되어
              있습니다.
            </h6>
          </section>
          <StartSection className="pt-10 pb-30" />
          <div className="mb-4 flex justify-between">
            <div>
              <h2 className="text-head-03 text-text-primary">최근 연습 기록</h2>
            </div>

            <button
              className="text-label-04 -mb-2 flex min-w-20 cursor-pointer items-center gap-1 text-text-deactivated transition-all hover:gap-2 hover:text-text-secondary"
              onClick={() => navigate("/report")}
            >
              전체 보기
              <ChevronRight size={16} />
            </button>
          </div>
          <RecordSection className="pt-5 pb-10" />
        </div>
      </main>
    </div>
  );
};

export default MainPage;
