import type { Meta, StoryObj } from "@storybook/react-vite";

import StartCard from "./StartCard";

const meta = {
  title: "Components/StartCard",
  component: StartCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "발표 및 면접 연습 시작을 위한 카드 컴포넌트입니다. 상단 아이콘, 중간 설명, 하단 액션 버튼으로 구성됩니다.",
      },
    },
  },
  // 1. argTypes를 먼저 정의하여 컨트롤 패널의 명세를 명확히 함
  argTypes: {
    type: {
      control: "inline-radio", // radio보다 공간을 덜 차지하는 inline-radio 권장
      options: ["발표", "면접"],
      description: "카드의 목적 타입을 결정합니다.",
      table: {
        type: { summary: '"발표" | "면접"' },
        defaultValue: { summary: "발표" },
      },
    },
    subtext: {
      control: "text",
      description: "카드 중앙에 표시될 상세 설명 문구입니다.",
    },
  },
  // 2. 공통 기본값 설정
  args: {
    type: "발표",
    subtext:
      "준비한 슬라이드를 보며 실제 발표처럼 연습하고 실시간 피드백을 받아보세요.",
  },
} satisfies Meta<typeof StartCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 상태 (발표 타입)
 */
export const Default: Story = {
  args: {
    subtext: "실전과 동일한 환경에서 발표 연습을 시작합니다.",
  },
};

/**
 * 면접 타입 예시
 */
export const Interview: Story = {
  args: {
    type: "면접",
    subtext: "AI 면접관과 함께 예상 질문을 주고받으며 실전 감각을 익힙니다.",
  },
};

/**
 * 텍스트가 매우 길어질 때의 레이아웃 확인용 (Edge Case)
 */
export const LongContent: Story = {
  args: {
    type: "발표",
    subtext:
      "이 텍스트는 레이아웃이 무너지는지 확인하기 위해 의도적으로 매우 길게 작성된 설명 문구입니다. 카드의 높이가 고정되어 있는지, 혹은 유연하게 늘어나는지 이 스토리를 통해 확인하세요.",
  },
};

/**
 * 비활성화 상태 (데코레이터를 통한 시각적 피드백 확인)
 */
export const Disabled: Story = {
  args: {
    subtext: "현재 이 기능은 점검 중으로 사용할 수 없습니다.",
  },
  decorators: [
    (Story) => (
      <div className="pointer-events-none opacity-50">
        <Story />
      </div>
    ),
  ],
};
