import type { Meta, StoryObj } from "@storybook/react-vite";

import { Header } from "./Header";

const meta: Meta<typeof Header> = {
  title: "UI/MainSection/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};

export const EdgeCase: Story = {
  args: {},
};
