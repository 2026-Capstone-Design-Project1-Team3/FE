import type { Meta, StoryObj } from "@storybook/react-vite";

import { FolderInsightSummary } from "./FolderInsightSummary";

const meta: Meta<typeof FolderInsightSummary> = {
  title: "UI/FolderDetail/FolderInsightSummary",
  component: FolderInsightSummary,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FolderInsightSummary>;

export const Default: Story = {
  args: {
    insights: [
      {
        label: "strengths",
        title: "Strengths",
        description:
          "명확한 논리 구조와 자신감 있는 목소리 톤이 일관되게 유지되고 있습니다.",
        tone: "positive",
      },
      {
        label: "growth-areas",
        title: "Growth Areas",
        description:
          "질의응답 시 불필요한 추임새(어, 음) 빈도를 줄이면 더욱 전문적으로 보입니다.",
        tone: "growth",
      },
    ],
  },
};
