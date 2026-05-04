import type { Meta, StoryObj } from "@storybook/react-vite";
import { Mic, Presentation, AlertCircle, MessagesSquare } from "lucide-react";

import { StartCard } from "./StartCard";

import InterviewImage from "@/assets/interview.png";
import PresentationImage from "@/assets/presentation.png";

const meta: Meta<typeof StartCard> = {
  title: "UI/StartCard",
  component: StartCard,
  tags: ["autodocs"],
  argTypes: {
    Icon: { control: false },
    title: { control: "text" },
    description: { control: "text" },
    buttonText: { control: "text" },
    bgImage: { control: "text" },
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

export const InterviewCard: Story = {
  args: {
    Icon: Mic,
    IconClass: "bg-primary-100 text-primary-600",
    title: "AI 모의 면접",
    description: "실전 같은 면접 연습을 시작해보세요.",
    buttonText: "시작하기",
    bgImage: InterviewImage,
  },
};

export const PresentationCard: Story = {
  args: {
    Icon: Presentation,
    IconClass: "bg-secondary-100 text-secondary-600",
    title: "발표 연습하기",
    description: "발표의 시선 처리와 발음을 교정해드립니다.",
    buttonText: "연습 시작",
    bgImage: PresentationImage,
  },
};

export const EdgeCase: Story = {
  args: {
    Icon: AlertCircle,
    IconClass: "bg-error-01/30 text-error-03",
    title: "제목이 매우 길어서 한 줄을 넘어가는 경우의 테스트입니다",
    description:
      "설명글 또한 매우 길어서 줄바꿈과 레이아웃이 깨지지 않는지 확인하기 위한 텍스트입니다. whitespace-pre-wrap 속성이 적용되어 있습니다.",
    buttonText: "확인",
  },
};

export const GridExample: Story = {
  render: () => (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 p-6 md:grid-cols-2">
      <StartCard
        bgImage={PresentationImage}
        Icon={Presentation}
        IconClass="bg-primary-600/50 text-primary-900"
        title="면접 연습"
        description={
          "직무 맞춤형 예상 질문에 답하고 즉각적인 피드백을 받아보세요. \n답변의 논리성과 비언어적 표현을 코칭합니다."
        }
        buttonText="시작하기"
        buttonClass="text-primary-800"
      />
      <StartCard
        bgImage={InterviewImage}
        Icon={MessagesSquare}
        IconClass="bg-secondary-600/50 text-secondary-900"
        title="발표 연습"
        description={
          "실제 청중 앞에서 말하는 듯한 시뮬레이션 환경을 제공합니다. \n시선 처리, 목소리 톤, 속도를 AI가 정밀 분석합니다."
        }
        buttonText="시작하기"
        buttonClass="text-secondary-800"
      />
    </div>
  ),
};
