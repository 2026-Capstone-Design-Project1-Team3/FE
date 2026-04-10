import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatsSection } from "./StatsSection";

const meta: Meta<typeof StatsSection> = {
  title: "Components/Sections/StatsSection",
  component: StatsSection,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof StatsSection>;

export const Default: Story = {
  args: {
    records: [
      { gazeScore: 85, speedScore: 80, fluencyLevel: 2 },
      { gazeScore: 78, speedScore: 82, fluencyLevel: 2 },
      { gazeScore: 82, speedScore: 75, fluencyLevel: 1 },
      { gazeScore: 88, speedScore: 85, fluencyLevel: 3 },
      { gazeScore: 80, speedScore: 80, fluencyLevel: 2 },
    ],
  },
};

export const Empty: Story = {
  args: {
    records: [],
  },
};
