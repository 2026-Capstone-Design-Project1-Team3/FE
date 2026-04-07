import type { Meta, StoryObj } from "@storybook/react-vite";

import { SignupStepBadge } from "./SignupStepBadge";

const meta = {
  title: "UI/SignupStepBadge",
  component: SignupStepBadge,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "회원가입 등 단계별 프로세스에서 현재 진행 상태를 나타내는 배지 컴포넌트입니다.",
      },
    },
  },
  args: {
    step: 1,
    active: false,
  },
  argTypes: {
    active: {
      control: "boolean",
      description: "현재 단계가 활성화되었는지 여부를 결정합니다.",
    },
    step: {
      control: "text",
      description: "배지 내부에 표시될 단계(숫자 또는 문자열)입니다.",
    },
  },
} satisfies Meta<typeof SignupStepBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Active: Story = {
  args: {
    step: 1,
    active: true,
  },
};

export const Inactive: Story = {
  args: {
    step: 2,
    active: false,
  },
};

export const StepperExample: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <SignupStepBadge step={1} active />
      <div className="h-px w-8 bg-border-deactivated" />
      <SignupStepBadge step={2} active={false} />
      <div className="h-px w-8 bg-border-deactivated" />
      <SignupStepBadge step={3} active={false} />
    </div>
  ),
};
