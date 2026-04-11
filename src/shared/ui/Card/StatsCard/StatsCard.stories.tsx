import type { Meta, StoryObj } from "@storybook/react-vite";

import { StatsCard } from "./StatsCard";

const meta: Meta<typeof StatsCard> = {
  title: "UI/StatsCard",
  component: StatsCard,
  tags: ["autodocs"],
  argTypes: {
    score: {
      control: { type: "number" },
      description: "표시할 수치 데이터입니다.",
    },
    unit: {
      control: { type: "text" },
      description: "수치의 단위입니다 (%, 점, 명 등).",
    },
  },
};

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Default: Story = {
  args: {
    title: "현재 달성률",
    score: 75,
    unit: "%",
  },
};

export const WithDescription: Story = {
  args: {
    title: "종합 점수",
    score: 98,
    unit: "점",
    description: "지난 분기 대비 12% 향상되었습니다.",
  },
};

export const EdgeCase: Story = {
  args: {
    title: "매우 길어서 레이아웃을 위협하는 수준의 카드 제목 테스트입니다",
    score: 99.9,
    unit: "상태단위",
    description:
      "설명 텍스트 또한 매우 길게 작성하여 말줄임표 처리나 레이아웃 깨짐이 발생하는지 확인하기 위한 데이터입니다. 이 카드는 정상적으로 높이가 조절되어야 합니다.",
  },
};

export const GridExample: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4 p-4">
      <StatsCard title="사용자 수" score={120} unit="명" />
      <StatsCard
        title="매출 성장"
        score={15.4}
        unit="%"
        description="전월 대비"
      />
      <StatsCard
        title="이탈률"
        score={2.1}
        unit="%"
        className="border-blue-500"
      />
    </div>
  ),
};
