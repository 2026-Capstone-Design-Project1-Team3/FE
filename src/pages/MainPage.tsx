import { Header } from "@/shared/ui/MainSection/Header/Header";
import { RecordSection } from "@/shared/ui/MainSection/RecordSection/RecordSection";
import { StartSection } from "@/shared/ui/MainSection/StartSection/StartSection";

const MainPage = () => {
  return (
    <div>
      <Header />
      <StartSection />
      <RecordSection />
    </div>
  );
};

export default MainPage;
