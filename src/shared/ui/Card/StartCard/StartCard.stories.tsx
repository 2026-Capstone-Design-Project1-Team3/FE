import type { Meta, StoryObj } from "@storybook/react-vite";

import { StartCard } from "./StartCard";

const meta: Meta<typeof StartCard> = {
  title: "UI/StartCard",
  component: StartCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "radio",
      options: ["interview", "presentation"],
      description: "카드의 스타일과 아이콘 타입을 결정합니다.",
    },
    title: { control: "text" },
    description: { control: "text" },
    buttonText: { control: "text" },
  },

  parameters: {
    backgrounds: {
      default: "light",
      values: [{ name: "light", value: "#f8fafc" }],
    },
  },
};

export default meta;
type Story = StoryObj<typeof StartCard>;

export const Interview: Story = {
  args: {
    variant: "interview",
    title: "AI 모의 면접",
    description: "실전 같은 면접 연습을 시작해보세요.",
    buttonText: "시작하기",
  },
};

export const Presentation: Story = {
  args: {
    variant: "presentation",
    title: "발표 연습하기",
    description: "발표의 시선 처리와 발음을 교정해드립니다.",
    buttonText: "연습 시작",
  },
};

export const EdgeCase: Story = {
  args: {
    variant: "presentation",
    title: "제목이 매우 길어서 한 줄을 넘어가는 경우의 테스트입니다",
    description:
      "설명글 또한 매우 길어서 뒷부분이 말줄임표 처리가 되는지 확인하기 위한 텍스트입니다.",
    buttonText: "확인",
  },
};

export const GridExample: Story = {
  render: () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 max-w-2xl mx-auto">
      <StartCard
        variant="interview"
        title="AI 모의 면접"
        description="실전 같은 면접 연습을 시작해보세요. 면접관의 질문에 답변하고 상세한 피드백을 받아보세요."
        buttonText="면접 시작하기"
      />
      <StartCard
        variant="presentation"
        title="발표 연습하기"
        description="발표의 시선 처리와 발음을 교정해드립니다. 준비한 대본을 읽으며 실시간 코칭을 경험하세요."
        buttonText="발표 시작하기"
      />
    </div>
  ),
};
