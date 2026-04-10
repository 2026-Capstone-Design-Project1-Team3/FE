import { Header } from "@/shared/ui/MainSection/Header/Header";
import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { StartSection } from "@/shared/ui/MainSection/StartSection/StartSection";
import { StatsSection } from "@/shared/ui/MainSection/StatsSection/StatsSection";

const MainPage = () => {
  return (
    <div>
      <Header />
      <StartSection />
      <RecordSection />
      <StatsSection />
    </div>
  );
};

export default MainPage;
