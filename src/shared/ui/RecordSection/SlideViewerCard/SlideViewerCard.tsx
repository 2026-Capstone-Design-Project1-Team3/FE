import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/shared/ui/Button/Button";

interface SlideViewerCardProps {
  images: string[];
  currentIndex: number;
  onPrevClick: () => void;
  onNextClick: () => void;
}

export const SlideViewerCard = ({
  images,
  currentIndex,
  onPrevClick,
  onNextClick,
}: SlideViewerCardProps) => {
  if (!images || images.length === 0) return null;

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === images.length - 1;

  return (
    <div className="w-full max-w-lg rounded-2xl border border-border-default bg-background-light px-6 py-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-subtitle-01 text-text-primary">
          슬라이드 제어
        </span>
        <div className="rounded-full bg-primary-100 px-3 py-1">
          <span className="text-label-01 text-primary-900">
            {currentIndex + 1} / {images.length}
          </span>
        </div>
      </div>

      <div className="mb-6 aspect-video w-full overflow-hidden rounded-xl border border-border-deactivated bg-gray-100">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="flex w-full gap-4">
        <Button
          variant="outline"
          className="flex-1"
          onClick={onPrevClick}
          disabled={isFirstSlide}
        >
          <div className="flex items-center gap-2">
            <ChevronLeft className="h-5 w-5" />
            <span>{isFirstSlide ? "첫 번째 장" : "이전 슬라이드"}</span>
          </div>
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          onClick={onNextClick}
          disabled={isLastSlide}
        >
          <div className="flex items-center gap-2">
            <span>{isLastSlide ? "마지막 장" : "다음 슬라이드"}</span>
            <ChevronRight className="h-5 w-5" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default SlideViewerCard;
