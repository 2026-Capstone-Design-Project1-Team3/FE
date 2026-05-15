import type { Meta, StoryObj } from "@storybook/react-vite";

import AnswerCard from "./AnswerCard";

const meta: Meta<typeof AnswerCard> = {
  title: "UI/ReportSection/AnswerCard",
  component: AnswerCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof AnswerCard>;
export const Default: Story = {
  args: {
    percentage: 85,
    subtitle: "우수함",
    description:
      "질문의 의도를 정확히 파악하여 핵심 내용을 논리적으로 잘 전달했습니다. 구체적인 사례를 덧붙인 점이 좋습니다.",
  },
};
