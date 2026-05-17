import type { Meta, StoryObj } from "@storybook/react-vite";

import NonverbalCard from "./NonverbalCard";

const meta: Meta<typeof NonverbalCard> = {
  title: "UI/ReportSection/NonverbalCard",
  component: NonverbalCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof NonverbalCard>;

export const Default: Story = {
  args: {
    status: "안정적",
    subtitle: "자세 유지",
    description:
      "어깨와 팔의 대칭이 안정적입니다. 강조 시 손 동작을 추가하면 더욱 효과적입니다.",
  },
};
