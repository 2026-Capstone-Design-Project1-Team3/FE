import type { Meta, StoryObj } from "@storybook/react-vite";

import ScriptSimilarityCard from "./ScriptSimilarityCard";

const meta: Meta<typeof ScriptSimilarityCard> = {
  title: "UI/ReportSection/ScriptSimilarityCard",
  component: ScriptSimilarityCard,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof ScriptSimilarityCard>;

export const Default: Story = {
  args: {
    percentage: 90,
    subtitle: "매우 높음",
    description:
      "대본 숙련도가 매우 높으며, 본인의 언어로 자연스럽게 전달하는 수준입니다. 암기보다는 이해도가 돋보입니다.",
  },
};
