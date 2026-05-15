import type { Meta, StoryObj } from "@storybook/react-vite";

import TimeCard from "./TimeCard";

const meta: Meta<typeof TimeCard> = {
  title: "UI/RecordSection/TimeCard",
  component: TimeCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof TimeCard>;

export const Default: Story = {
  args: {
    isRunning: true,
    initialSeconds: 252,
  },
};
