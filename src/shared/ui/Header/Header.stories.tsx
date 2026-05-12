import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "UI/MainSection/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {
    logoText: {
      description: "좌측 로고에 표시될 텍스트입니다.",
      control: "text",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {
    logoText: "MY APP",
  },
};

export const EdgeCase: Story = {
  args: {
    logoText: "MY AWESOME DASHBOARD SERVICE",
  },
};
