import type { Meta, StoryObj } from "@storybook/react-vite";

import { Modal } from "./Modal";

const meta = {
  title: "UI/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "범용 모달 컴포넌트입니다. createPortal을 통해 body 최상단에 렌더링되어 레이어 간섭을 방지합니다.",
      },
    },
  },
  args: {
    isOpen: true,
    variant: "single",
    title: "정보 수정 완료",
    description: "기본 정보 수정이 완료 되었습니다.",
    cancelText: "취소",
    confirmText: "완료",
    onClose: () => {},
    onConfirm: () => {},
  },
  argTypes: {
    isOpen: {
      control: "boolean",
      description: "모달의 표시 여부를 결정합니다.",
    },
    variant: {
      control: "radio",
      options: ["single", "double"],
      description: "모달의 버튼 배치 타입을 결정합니다.",
    },
    title: {
      control: "text",
      description: "모달 상단에 표시될 제목입니다.",
    },
    description: {
      control: "text",
      description: "모달 중앙에 표시될 상세 설명 문구입니다.",
    },
    cancelText: {
      control: "text",
      description:
        "취소 버튼에 표시될 텍스트입니다. (variant가 'double'일 때만 표시)",
    },
    confirmText: {
      control: "text",
      description: "확인/수행 버튼에 표시될 텍스트입니다.",
    },
    onClose: {
      description: "닫기 또는 취소 버튼 클릭 시 호출되는 함수입니다.",
    },
    onConfirm: {
      description: "확인 버튼 클릭 시 호출되는 함수입니다.",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SingleButton: Story = {
  args: {
    isOpen: true,
    variant: "single",
    title: "정보 수정 완료",
    description: "정보 수정이 완료되었습니다.",
    confirmText: "확인",
  },
};

export const DoubleButton: Story = {
  args: {
    isOpen: true,
    variant: "double",
    title: "회원 탈퇴",
    description:
      "이 작업은 되돌릴 수 없으며\n모든 데이터가 영구적으로 삭제됩니다.",
    cancelText: "취소",
    confirmText: "탈퇴하기",
  },
};
