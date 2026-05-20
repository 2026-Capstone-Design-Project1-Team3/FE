import type { Meta, StoryObj } from "@storybook/react-vite";

import { RecordSection } from "./RecordSection";

import type { RecordTableRowProps } from "@/shared/ui/MainSection/RecordSection/RecordTableRow";

const meta: Meta<typeof RecordSection> = {
  title: "UI/MainSection/RecordSection",
  component: RecordSection,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof RecordSection>;

const mockData: RecordTableRowProps[] = [
  {
    folderId: "folder-123",
    variant: "interview",
    title: "프론트엔드 면접 기록",
    createAt: "2026-04-09",
  },
  {
    folderId: "folder-456",
    variant: "presentation",
    title: "디자인 시스템 회의",
    createAt: "2026-04-08",
  },
  {
    folderId: "folder-789",
    variant: "presentation",
    title: "백엔드 API 연동",
    createAt: "2026-04-07",
  },
  {
    folderId: "folder-789",
    variant: "interview",
    title: "백엔드 API 연동",
    createAt: "2026-04-07",
  },
  {
    folderId: "folder-789",
    variant: "interview",
    title: "백엔드 API 연동",
    createAt: "2026-04-07",
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
        folderId: "folder-000",
        variant: "interview",
        title: "",
        createAt: "",
      },
    ],
  },
};

export const EdgeCase: Story = {
  args: {
    initialData: [
      {
        folderId: "folder-long-1",
        variant: "interview",
        title:
          "매우 긴 제목의 인터뷰 기록입니다. 이 제목은 레이아웃을 테스트하기 위해 의도적으로 길게 작성되었습니다. 가로 너비가 좁을 때 어떻게 표시되는지 확인하세요.",
        createAt: "2026-05-04",
      },
    ],
  },
};
