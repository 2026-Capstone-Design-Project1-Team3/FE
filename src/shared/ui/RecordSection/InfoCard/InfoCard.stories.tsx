import type { Meta, StoryObj } from "@storybook/react-vite";

import InfoCard from "./InfoCard";

const meta: Meta<typeof InfoCard> = {
  title: "UI/RecordSection/InfoCard",
  component: InfoCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InfoCard>;

export const Interview: Story = {
  args: {
    variant: "interview",
    folderName: "2024 상반기 공채",
    date: "2024.05.20",
    companyName: "현대자동차",
    role: "IT 서비스 기획",
  },
};

export const Presentation: Story = {
  args: {
    variant: "presentation",
    folderName: "2024 상반기 핵심 역량 발표",
    date: "2024.10.24",
    targetTime: "05:00",
  },
};
