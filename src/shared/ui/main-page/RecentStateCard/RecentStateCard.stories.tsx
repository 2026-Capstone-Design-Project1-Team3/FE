import type { Meta, StoryObj } from "@storybook/react-vite";

import RecentStateCard from "./RecentStateCard";

const meta = {
  title: "Components/RecentStateCard",
  component: RecentStateCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "연습 기록 통계를 보여주는 카드 컴포넌트입니다. '점수'와 '횟수' 타입에 따라 아이콘과 테마 컬러가 자동으로 변경됩니다.",
      },
    },
  },
  argTypes: {
    data: {
      control: "object",
      description: "표시할 데이터 객체",
    },
  },
  // 전역 인자 설정
  args: {
    data: {
      type: "점수",
      content: "최근 연습 점수",
      number: 85,
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-[300px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof RecentStateCard>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * 기본 상태 (점수 타입)
 */
export const Default: Story = {
  args: {
    data: {
      type: "점수",
      content: "오늘의 최고 기록",
      number: 92,
    },
  },
};

/**
 * 횟수 타입 확인용
 */
export const Count: Story = {
  args: {
    data: {
      type: "횟수",
      content: "이번 주 누적 횟수",
      number: 24,
    },
  },
};

/**
 * 데이터가 없는 0 상태
 */
export const Empty: Story = {
  args: {
    data: {
      type: "횟수",
      content: "연습 기록 없음",
      number: 0,
    },
  },
};

/**
 * 텍스트가 매우 길거나 숫자가 큰 경우 (레이아웃 테스트)
 */
export const LongContent: Story = {
  args: {
    data: {
      type: "점수",
      content: "아주 긴 레이블을 가진 연습 기록 통계 데이터 텍스트 영역 테스트",
      number: 1234567,
    },
  },
};
