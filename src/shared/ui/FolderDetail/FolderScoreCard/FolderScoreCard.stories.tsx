import type { Meta, StoryObj } from "@storybook/react-vite";

import { FolderScoreCard } from "./FolderScoreCard";

const meta: Meta<typeof FolderScoreCard> = {
  title: "UI/FolderDetail/FolderScoreCard",
  component: FolderScoreCard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FolderScoreCard>;

export const Default: Story = {
  args: {
    title: "평균 코칭 성과",
    score: 90,
    delta: "+5%",
  },
};
