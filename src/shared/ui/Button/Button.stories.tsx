import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: "기본 버튼 컴포넌트입니다. Primary/Outline 타입을 지원.",
      },
    },
  },
  args: {
    label: "버튼",
    variant: "primary",
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline"],
      description: "버튼의 시각적 스타일을 결정합니다.",
    },
    disabled: {
      control: "boolean",
      description: "버튼의 비활성화 여부를 결정합니다.",
    },
    label: {
      control: "text",
      description: "버튼 내부에 표시될 텍스트입니다.",
    },
    children: {
      control: false,
      description: "label 대신 ReactNode 형태의 자식을 전달할 수 있습니다.",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "회원가입 완료",
    variant: "primary",
  },
};

export const Outline: Story = {
  args: {
    label: "취소",
    variant: "outline",
  },
};

export const Disabled: Story = {
  args: {
    label: "회원가입 완료",
    disabled: true,
  },
};

export const ButtonGroup: Story = {
  render: () => (
    <div className="flex gap-4 w-full max-w-100">
      <Button variant="outline" label="취소" />
      <Button variant="primary" label="회원가입 완료" />
    </div>
  ),
};
