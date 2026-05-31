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
          "사용자의 이름, 아이디, 이메일 정보를 표시하고 이름 수정 입력을 제공하는 폼 컴포넌트입니다.",
      },
    },
  },

  args: {
    className: "max-w-[800px] p-6 bg-background-primary",
    email: "knu_cse@knu.ac.kr",
    loginId: "knu_student",
    name: "홍길동",
    onChange: () => {},
  },
} satisfies Meta<typeof UserChangeInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Disabled: Story = {
  args: {
    disabled: true,
    email: "knu_cse@knu.ac.kr",
    loginId: "knu_student",
    name: "홍길동",
  },
};

export const EdgeCase: Story = {
  args: {
    email: "",
    loginId: "very_long_user_id_for_layout_check",
    name: "A",
  },
};
