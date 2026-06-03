import { useState, useRef } from "react";

import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/shared/ui/Button/Button";
import CameraComponent, {
  type CameraHandle,
} from "@/shared/ui/CameraComponent/CameraComponent";
import { InfoCard } from "@/shared/ui/RecordSection/InfoCard/InfoCard";
import { SlideViewerCard } from "@/shared/ui/RecordSection/SlideViewerCard/SlideViewerCard";
import { SpeedCard } from "@/shared/ui/RecordSection/SpeedCard/SpeedCard";
import { TimeCard } from "@/shared/ui/RecordSection/TimeCard/TimeCard";

const MOCK_INFO = {
  variant: "presentation" as const,
  folderName: "2024 상반기 핵심 역량 발표",
};

const MOCK_SLIDES = [
  "https://picsum.photos/seed/slide1/800/450",
  "https://picsum.photos/seed/slide2/800/450",
  "https://picsum.photos/seed/slide3/800/450",
  "https://picsum.photos/seed/slide4/800/450",
];

const PresentationRecordPage = () => {
  const navigate = useNavigate();
  const cameraRef = useRef<CameraHandle>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(MOCK_SLIDES.length - 1, prev + 1));
  };

  return (
    <div className="min-h-screen w-full bg-background-dark px-8 py-10 flex items-center justify-center">
      <div className="mx-auto flex w-full max-w-360 items-stretch gap-8">
        <section className="flex flex-1 flex-col justify-center gap-6">
          <div className="w-full aspect-video overflow-hidden rounded-2xl bg-black shadow-md">
            <CameraComponent ref={cameraRef} />
          </div>
          <InfoCard
            variant={MOCK_INFO.variant}
            folderName={MOCK_INFO.folderName}
          />
        </section>

        <aside className="flex w-105 shrink-0 flex-col gap-6">
          <TimeCard isRunning={true} initialSeconds={252} />
          <SpeedCard status="normal" />
          <SlideViewerCard
            images={MOCK_SLIDES}
            currentIndex={currentSlideIndex}
            onPrevClick={handlePrevSlide}
            onNextClick={handleNextSlide}
          />

          <Button
            className="mt-auto bg-secondary-900 text-white hover:bg-secondary-800 active:scale-[0.98] py-6 text-subtitle-02"
            onClick={() => navigate("/presentation/report")}
          >
            <div className="flex items-center text-white justify-center gap-2">
              <LogOut className="h-5 w-5" strokeWidth={2.5} />
              <span>발표 종료</span>
            </div>
          </Button>
        </aside>
      </div>
    </div>
  );
};

export default PresentationRecordPage;
