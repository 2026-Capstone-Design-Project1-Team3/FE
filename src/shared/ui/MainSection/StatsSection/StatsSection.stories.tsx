import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatsSection } from "./StatsSection";

import { mockRecords } from "@/mocks/mainRecordData";

const meta: Meta<typeof StatsSection> = {
  title: "UI/MainSection/StatsSection",
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
    records: mockRecords,
  },
};

export const Empty: Story = {
  args: {
    records: [],
  },
};
