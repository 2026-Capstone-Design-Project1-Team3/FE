import type { Meta, StoryObj } from "@storybook/react-vite";

import TextInput from "./TextInput";

const meta = {
  title: "UI/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "기본 텍스트 입력 컴포넌트입니다. 필수/우측 아이콘 여부 props로 설정 가능",
      },
    },
  },
  args: {
    id: "default-input",
    label: "이메일 주소",
    placeholder: "example@email.com",
    disabled: false,
    required: false,
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description: "인풋 박스의 비활성화 여부를 결정합니다.",
    },
    required: {
      control: "boolean",
      description:
        "필수 입력 여부를 결정합니다. true일 경우 라벨 옆에 빨간색 * 기호가 표시됩니다.",
    },
    // ReactNode는 컨트롤 패널에서 조작하기 어려우므로 숨기거나 설명을 추가해줍니다.
    rightElement: {
      control: false,
      description:
        "인풋 우측에 들어갈 React 요소입니다. (비밀번호 보기 아이콘 등)",
    },
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Required: Story = {
  args: {
    id: "required-input",
    label: "비밀번호",
    placeholder: "비밀번호를 입력해주세요.",
    required: true,
  },
};

// 💡 새로 추가된 스토리! 우측 아이콘(rightElement) 테스트용
export const WithRightElement: Story = {
  args: {
    id: "icon-input",
    label: "비밀번호",
    placeholder: "비밀번호를 입력해주세요.",
    required: true,
    type: "password", // 비밀번호 타입 적용
    rightElement: (
      <button
        type="button"
        className="text-gray-400 hover:text-gray-600 transition-colors px-1"
        onClick={() => alert("아이콘 클릭 작동!")}
      >
        {/* 🚨 나중에 여기에 <Eye /> 같은 루시드 아이콘을 넣으시면 됩니다! */}
        👁️
      </button>
    ),
  },
};

export const Disabled: Story = {
  args: {
    id: "disabled-input",
    label: "비활성화 된 인풋 (Disabled)",
    placeholder: "입력할 수 없는 상태입니다.",
    disabled: true,
  },
};

export const EdgeCase: Story = {
  args: {
    id: "edgecase-input",
    label:
      "아주 긴 라벨 텍스트가 들어왔을 때 레이아웃이 깨지지 않고 정상적으로 렌더링 되는지 확인하기 위한 엣지 케이스 예시",
    placeholder:
      "아주 긴 안내 텍스트가 플레이스홀더로 들어올 경우의 예시입니다...",
  },
};
