import type { FC } from "react";

import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { StartSection } from "@/shared/ui/MainSection/StartSection/StartSection";

interface MainPageProps {
  username?: string;
}
const MainPage: FC<MainPageProps> = (props) => {
  const { username } = props;
  return (
    <main>
      <div className="p-8">
        <section className="py-10">
          <h1 className="text-head-01">
            {username || "사용자"}님, 안녕하세요!
          </h1>
          <h6 className="text-body-01">
            당신의 면접과 발표 역량을 한 단계 더 높여줄 AI 멘토가 준비되어
            있습니다.
          </h6>
        </section>
        <StartSection className="py-10" />
        <RecordSection className="py-10" />
      </div>
    </main>
  );
};

export default MainPage;
