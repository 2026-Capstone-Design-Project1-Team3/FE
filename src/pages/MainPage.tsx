import type { FC } from "react";

import { Footer } from "@/shared/ui/MainSection/Footer/Footer";
import { Header } from "@/shared/ui/MainSection/Header/Header";
import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { StartSection } from "@/shared/ui/MainSection/StartSection/StartSection";

interface MainPageProps {
  username?: string;
}
const MainPage: FC<MainPageProps> = (props) => {
  const { username } = props;
  return (
    <main>
      <Header />
      <div className="mx-auto max-w-6xl p-8">
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
      <Footer />
    </main>
  );
};

export default MainPage;
