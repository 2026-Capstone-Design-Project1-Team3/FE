import type { Meta, StoryObj } from "@storybook/react-vite";

import RecentRecordCard from "./RecentRecordCard";

const meta = {
  title: "Components/RecentRecordCard",
  component: RecentRecordCard,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "면접 및 발표 기록을 보여주는 가로형 카드 컴포넌트입니다. 점수는 0~100 사이의 백분율로 표시됩니다.",
      },
    },
  },
  args: {
    data: {
      type: "면접",
      name: "2026 상반기 신입 개발자 기술 면접",
      // Storybook 환경에서 직렬화 가능한 형태로 전달하는 것이 권장됩니다.
      time: new Date("2026-03-11T10:00:00"),
      score: 85,
    },
  },
} satisfies Meta<typeof RecentRecordCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Presentation: Story = {
  args: {
    data: {
      type: "발표",
      name: "프론트엔드 성능 최적화 전략 세미나",
      time: new Date("2026-03-11T14:00:00"),
      score: 92,
    },
  },
};

export const ZeroScore: Story = {
  args: {
    data: {
      type: "면접",
      name: "미응시 또는 낮은 점수 사례",
      time: new Date("2026-03-11T09:00:00"),
      score: 0,
    },
  },
};

export const LongTitle: Story = {
  args: {
    data: {
      type: "발표",
      name: "사용자 경험 중심의 인터랙티브 웹 디자인 시스템 구축 및 유지보수에 관한 심도 깊은 연구 발표",
      time: new Date("2026-03-11T16:00:00"),
      score: 100,
    },
  },
};
