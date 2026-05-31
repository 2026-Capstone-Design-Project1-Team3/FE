import type { Meta, StoryObj } from "@storybook/react-vite";

import { ChangePassword } from "./ChangePassword";

const meta = {
  title: "UI/ChangePassword",
  component: ChangePassword,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "비밀번호 변경 폼 컴포넌트입니다. 현재 비밀번호 확인 및 신규 비밀번호의 유효성 검사 기능을 포함합니다.",
      },
    },
    layout: "centered",
  },

  args: {
    className:
      "w-[400px] p-6 bg-background-primary border border-gray-200 rounded-lg",
    newPassWord: "",
    newPassWordConfirm: "",
    onChange: () => {},
    pastPassWord: "",
  },
} satisfies Meta<typeof ChangePassword>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Disabled: Story = {
  args: {
    disabled: true,
    newPassWord: "Password!123",
    newPassWordConfirm: "Password!123",
    pastPassWord: "Current!123",
  },
};

export const EdgeCase: Story = {
  args: {
    newPassWord: "short",
    newPassWordConfirm: "different",
    pastPassWord: "",
  },
};
