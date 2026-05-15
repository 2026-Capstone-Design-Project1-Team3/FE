import type { Meta, StoryObj } from "@storybook/react-vite";

import GazeCard from "./GazeCard";

const meta: Meta<typeof GazeCard> = {
  title: "UI/ReportSection/GazeCard",
  component: GazeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof GazeCard>;

export const Default: Story = {
  args: {
    percentage: 88,
    subtitle: "정면 응시율",
    description:
      "높은 응시율로 청중에게 신뢰감을 전달했으며 시선 배분이 일정합니다.",
  },
};
