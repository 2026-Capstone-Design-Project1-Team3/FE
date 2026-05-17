import type { Meta, StoryObj } from "@storybook/react-vite";

import FluencyCard from "./FluencyCard";

const meta: Meta<typeof FluencyCard> = {
  title: "UI/ReportSection/FluencyCard",
  component: FluencyCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FluencyCard>;

export const Default: Story = {
  args: {
    status: "High",
    subtitle: "우수 단계",
    description:
      "불필요한 추임새 없이 문장 연결이 매우 매끄럽고 호흡이 안정적입니다.",
  },
};
