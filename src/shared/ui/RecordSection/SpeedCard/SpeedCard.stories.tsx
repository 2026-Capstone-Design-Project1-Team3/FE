import type { Meta, StoryObj } from "@storybook/react-vite";

import SpeedCard from "./SpeedCard";

const meta: Meta<typeof SpeedCard> = {
  title: "UI/RecordSection/SpeedCard",
  component: SpeedCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof SpeedCard>;

export const Slow: Story = {
  args: {
    status: "slow",
  },
};

export const Normal: Story = {
  args: {
    status: "normal",
  },
};

export const Fast: Story = {
  args: {
    status: "fast",
  },
};
