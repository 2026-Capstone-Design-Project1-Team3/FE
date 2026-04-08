import type { Meta, StoryObj } from "@storybook/react-vite";

import { RecordCard } from "./RecordCard";

const meta: Meta<typeof RecordCard> = {
  title: "UI/RecordCard",
  component: RecordCard,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["interview", "presentation"],
      description: "카드의 테마(아이콘 및 배경색)를 결정합니다.",
    },
    title: {
      control: "text",
      description: "메인 제목 텍스트",
    },
    date: {
      control: "text",
      description: "하단에 표시될 날짜/시간 정보",
    },
    button: {
      control: "text",
      description: "우측 버튼에 표시될 텍스트",
    },
    disabled: {
      control: "boolean",
      description: "버튼의 비활성화 상태 여부",
    },
  },
};

export default meta;
type Story = StoryObj<typeof RecordCard>;

export const Interview: Story = {
  args: {
    id: "rec-1",
    variant: "interview",
    title: "상반기 공채 모의 면접",
    date: "2024.04.08 14:00",
    button: "결과 확인",
    disabled: false,
  },
};

export const Presentation: Story = {
  args: {
    id: "rec-2",
    variant: "presentation",
    title: "기술 스택 세미나 발표",
    date: "2024.04.10 10:30",
    button: "다시 듣기",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    ...Interview.args,
    title: "분석 중인 레코드",
    button: "대기 중",
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    ...Interview.args,
    title:
      "이것은 매우 긴 제목입니다. 과연 이 카드는 제목이 길어져도 레이아웃을 유지할 수 있을까요? 확인이 필요합니다.",
    button: "클릭하면 상세 페이지로 이동하는 긴 버튼 텍스트",
  },
};

export const GridExample: Story = {
  render: (args) => (
    <div className="flex flex-col">
      <RecordCard
        {...args}
        id="1"
        variant="interview"
        title="1차 기술 면접 연습"
        date="방금 전"
        button="결과보기"
      />
      <RecordCard
        {...args}
        id="2"
        variant="presentation"
        title="프로젝트 최종 발표"
        date="2시간 전"
        button="결과보기"
      />
      <RecordCard
        {...args}
        id="3"
        variant="interview"
        title="인성 면접 대비"
        date="어제"
        button="결과보기"
      />
    </div>
  ),
};
