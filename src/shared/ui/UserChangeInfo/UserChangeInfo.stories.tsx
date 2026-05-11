import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserChangeInfo } from "./UserChangeInfo";

const meta = {
  title: "UI/UserChangeInfo",
  component: UserChangeInfo,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "사용자의 이름, 아이디, 이메일 정보를 수정하는 폼 컴포넌트입니다. 아이디 중복 확인 로직과 유효성 검사 메시지를 포함합니다.",
      },
    },
  },

  args: {
    className: "max-w-[800px] p-6 bg-background-primary",
  },
} satisfies Meta<typeof UserChangeInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    prevName: "홍길동",
    userId: "knu_student",
    userEmail: "knu_cse@knu.ac.kr",
  },
};
