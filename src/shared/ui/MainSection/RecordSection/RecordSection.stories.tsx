import type React from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";

import { RecordSection } from "./RecordSection";

import type { RecordTableRowProps } from "@/shared/ui/MainSection/RecordSection/RecordTableRow";

type RecordSectionStoryProps = React.ComponentProps<typeof RecordSection> & {
  initialData?: RecordTableRowProps[];
};

const RecordSectionWithMock =
  RecordSection as React.FC<RecordSectionStoryProps>;

const meta: Meta<typeof RecordSectionWithMock> = {
  title: "UI/MainSection/RecordSection",
  component: RecordSectionWithMock,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RecordSectionWithMock>;

const mockData: RecordTableRowProps[] = [
  {
    analysisId: "folder-123",
    variant: "interview",
    title: "프론트엔드 면접 기록",
    createdAt: "2026-04-09",
  },
  {
    analysisId: "folder-456",
    variant: "presentation",
    title: "디자인 시스템 회의",
    createdAt: "2026-04-08",
  },
  {
    analysisId: "folder-789",
    variant: "presentation",
    title: "백엔드 API 연동",
    createdAt: "2026-04-07",
  },
  {
    analysisId: "folder-790",
    variant: "interview",
    title: "백엔드 API 연동",
    createdAt: "2026-04-07",
  },
  {
    analysisId: "folder-791",
    variant: "interview",
    title: "백엔드 API 연동",
    createdAt: "2026-04-07",
  },
];

export const Default: Story = {
  args: {
    initialData: mockData,
  },
};

export const InterviewOnly: Story = {
  args: {
    initialData: mockData,
    filterVariant: "interview",
  },
};

export const PresentationOnly: Story = {
  args: {
    initialData: mockData,
    filterVariant: "presentation",
  },
};

export const CountLimited: Story = {
  args: {
    initialData: mockData,
    count: 3,
  },
};

export const Empty: Story = {
  args: {
    initialData: [],
  },
};

export const MissingFields: Story = {
  args: {
    initialData: [
      {
        analysisId: "folder-000",
        variant: "interview",
        title: "",
        createdAt: "",
      },
    ],
  },
};

export const EdgeCase: Story = {
  args: {
    initialData: [
      {
        analysisId: "folder-long-1",
        variant: "interview",
        title:
          "매우 긴 제목의 인터뷰 기록입니다. 이 제목은 레이아웃을 테스트하기 위해 의도적으로 길게 작성되었습니다. 가로 너비가 좁을 때 어떻게 표시되는지 확인하세요.",
        createdAt: "2026-05-04",
      },
    ],
  },
};
