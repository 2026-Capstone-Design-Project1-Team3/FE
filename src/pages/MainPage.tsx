import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { StartSection } from "@/shared/ui/MainSection/StartSection/StartSection";
import { StatsSection } from "@/shared/ui/MainSection/StatsSection/StatsSection";

const MainPage = () => {
  return (
    <div>
      <StartSection />
      <RecordSection />
      <StatsSection />
    </div>
  );
};

export default MainPage;
