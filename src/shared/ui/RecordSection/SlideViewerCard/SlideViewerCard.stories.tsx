import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { SlideViewerCard } from "./SlideViewerCard";

const meta: Meta<typeof SlideViewerCard> = {
  title: "UI/RecordSection/SlideViewerCard",
  component: SlideViewerCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SlideViewerCard>;

const DUMMY_IMAGES = [
  "https://picsum.photos/seed/slide1/800/450",
  "https://picsum.photos/seed/slide2/800/450",
  "https://picsum.photos/seed/slide3/800/450",
  "https://picsum.photos/seed/slide4/800/450",
];

const SlideViewerCardWithState = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(DUMMY_IMAGES.length - 1, prev + 1));
  };

  return (
    <SlideViewerCard
      images={DUMMY_IMAGES}
      currentIndex={currentIndex}
      onPrevClick={handlePrev}
      onNextClick={handleNext}
    />
  );
};

export const Default: Story = {
  render: () => <SlideViewerCardWithState />,
};
