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
    createAt: {
      control: "text",
      description: "하단에 표시될 날짜/시간 정보",
    },
    children: {
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
    folderId: "rec-1",
    variant: "interview",
    title: "상반기 공채 모의 면접",
    description: "기술 면접 및 문화 적합성 면접 질문 리스트",
    createAt: "2024.04.08 14:00",
    children: "결과 확인",
    disabled: false,
  },
};

export const Presentation: Story = {
  args: {
    folderId: "rec-2",
    variant: "presentation",
    title: "기술 스택 세미나 발표",
    description: "전사 디자인 가이드라인 통일화 전략 세션",
    createAt: "2024.04.10 10:30",
    children: "다시 듣기",
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    ...Interview.args,
    title: "분석 중인 레코드",
    children: "대기 중",
    disabled: true,
  },
};

export const LongText: Story = {
  args: {
    ...Interview.args,
    title:
      "이것은 매우 긴 제목입니다. 과연 이 카드는 제목이 길어져도 레이아웃을 유지할 수 있을까요? 확인이 필요합니다.",
    description:
      "설명 텍스트 또한 매우 길어질 수 있습니다. 이럴 때 전체 레이아웃의 균형을 유지하면서 사용자에게 정보를 전달해야 합니다.",
    children: "클릭하면 상세 페이지로 이동하는 긴 버튼 텍스트",
  },
};

export const GridExample: Story = {
  render: (args) => (
    <div className="flex flex-col">
      <RecordCard
        {...args}
        folderId="1"
        variant="interview"
        title="1차 기술 면접 연습"
        description="전사 디자인 가이드라인 통일화 전략 세션"
        createAt="방금 전"
        children="결과보기"
      />
      <RecordCard
        {...args}
        folderId="2"
        variant="presentation"
        title="프로젝트 최종 발표"
        description="전사 디자인 가이드라인 통일화 전략 세션"
        createAt="2시간 전"
        children="결과보기"
      />
      <RecordCard
        {...args}
        folderId="3"
        variant="interview"
        title="인성 면접 대비"
        description="전사 디자인 가이드라인 통일화 전략 세션"
        createAt="어제"
        children="결과보기"
      />
    </div>
  ),
};
