import type { Meta, StoryObj } from "@storybook/react-vite";

import AIEvaluationCard from "./AIEvaluationCard";

const meta: Meta<typeof AIEvaluationCard> = {
  title: "UI/ReportSection/AIEvaluationCard",
  component: AIEvaluationCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof AIEvaluationCard>;

export const Default: Story = {
  args: {
    overallReview:
      "전체적인 전달력은 우수하지만, 결론부의 강조를 위한 완급 조절이 보완되면 완벽한 발표가 될 것입니다.",
    strengths: [
      "안정적인 시선 처리 및 청중 교감",
      "자연스러운 제스처와 신체 언어",
    ],
    improvements: [
      "적절한 포즈(Pause) 활용 필요",
      "핵심 키워드 발음 시 강세 조절",
    ],
  },
};
