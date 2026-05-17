import type { Meta, StoryObj } from "@storybook/react-vite";

import SpeechCard from "./SpeechCard";

const meta: Meta<typeof SpeechCard> = {
  title: "UI/ReportSection/SpeechCard",
  component: SpeechCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpeechCard>;

export const Default: Story = {
  args: {
    score: "92점",
    scoreSubtitle: "적정성",
    wpm: "135",
    wpmSubtitle: "WPM",
    description:
      "전반적인 속도는 이상적이나, 결론 부분에서 속도가 빨라지는 점을 주의하세요.",
  },
};
