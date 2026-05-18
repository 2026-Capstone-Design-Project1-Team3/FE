import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { QuestionCard } from "./QuestionCard";

const meta: Meta<typeof QuestionCard> = {
  title: "UI/RecordSection/QuestionCard",
  component: QuestionCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof QuestionCard>;

const MOCK_QUESTIONS = [
  "본인의 가장 큰 강점과 이를 발휘한 경험에 대해 말씀해 주세요.",
  "협업 중 갈등이 발생했을 때 어떻게 해결하시나요?",
  "우리 기업에 지원하게 된 동기는 무엇인가요?",
];

const QuestionCardWithState = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswering, setIsAnswering] = useState(false);

  const handleStartAnswer = () => {
    setIsAnswering(true);
  };

  const handleNext = () => {
    setIsAnswering(false);
    setCurrentIndex((prev) => Math.min(MOCK_QUESTIONS.length - 1, prev + 1));
  };

  return (
    <QuestionCard
      questions={MOCK_QUESTIONS}
      currentIndex={currentIndex}
      isAnswering={isAnswering}
      onStartAnswer={handleStartAnswer}
      onNextQuestion={handleNext}
    />
  );
};

export const Default: Story = {
  render: () => <QuestionCardWithState />,
};
