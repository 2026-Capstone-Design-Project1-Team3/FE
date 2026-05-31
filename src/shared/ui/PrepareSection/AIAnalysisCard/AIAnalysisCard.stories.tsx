import type { Meta, StoryObj } from "@storybook/react-vite";

import { AIAnalysisCard } from "./AIAnalysisCard";

const meta: Meta<typeof AIAnalysisCard> = {
  title: "UI/PrepareSection/AIAnalysisCard",
  component: AIAnalysisCard,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center min-h-screen p-10 bg-gray-100">
        <div className="w-full max-w-3xl">
          <Story />
        </div>
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AIAnalysisCard>;

export const InitialState: Story = {
  args: {
    scanStatus: "pending",
    generateStatus: "pending",
    onStartAnalysis: () => alert("분석 시작!"),
  },
};

export const InProgress: Story = {
  args: {
    scanStatus: "complete",
    generateStatus: "loading",
    onStartAnalysis: () => alert("이미 분석이 진행 중입니다."),
  },
};

export const AllComplete: Story = {
  args: {
    scanStatus: "complete",
    generateStatus: "complete",
    onStartAnalysis: () => alert("분석을 다시 시작하시겠습니까?"),
  },
};
