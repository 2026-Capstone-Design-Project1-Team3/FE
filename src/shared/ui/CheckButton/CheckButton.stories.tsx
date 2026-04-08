import type { Meta, StoryObj } from "@storybook/react-vite";

import { CheckButton } from "./CheckButton";

const meta: Meta<typeof CheckButton> = {
  title: "UI/CheckButton",
  component: CheckButton,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: "radio",
      options: ["default", "checking", "checked"],
      description: "버튼의 현재 상태",
    },
    disabled: {
      control: "boolean",
      description: "버튼 비활성화 여부",
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof CheckButton>;

export const Default: Story = {
  args: {
    variant: "default",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    variant: "default",
    disabled: true,
  },
};

export const Checking: Story = {
  args: {
    variant: "checking",
  },
};

export const Checked: Story = {
  args: {
    variant: "checked",
  },
};
