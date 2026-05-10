import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserHeader } from "./UserHeader";

const meta = {
  title: "UI/UserHeader",
  component: UserHeader,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "사용자의 프로필 요약 정보를 표시하는 헤더 컴포넌트입니다. 이름과 이메일 주소를 레이아웃에 맞춰 보여줍니다.",
      },
    },
  },
  args: {
    userName: "홍길동",
    email: "knu_student@knu.ac.kr",
    className: "p-4 bg-white",
  },
} satisfies Meta<typeof UserHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Empty: Story = {
  args: {
    userName: "",
    email: "",
  },
};
