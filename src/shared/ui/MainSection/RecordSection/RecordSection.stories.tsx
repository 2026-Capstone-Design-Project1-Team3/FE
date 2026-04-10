import type { Meta, StoryObj } from "@storybook/react-vite";

import { RecordSection } from "./RecordSection";

import type { RecordCardProps } from "@/shared/ui/Card/RecordCard/RecordCard";

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

const mockData: RecordCardProps[] = [
  {
    folderId: "folder-123",
    variant: "interview",
    title: "프론트엔드 면접 기록",
    description: "React와 Next.js 기술 면접 질문 모음입니다.",
    createAt: "2026-04-09",
  },
  {
    folderId: "folder-456",
    variant: "presentation",
    title: "디자인 시스템 회의",
    description: "Tailwind CSS 도입 및 컴포넌트 라이브러리 구조 논의 기록",
    createAt: "2026-04-08",
  },
  {
    folderId: "folder-789",
    variant: "presentation",
    title: "백엔드 API 연동",
    description: "Swagger 명세 확인 및 에러 핸들링 정책 수립",
    createAt: "2026-04-07",
  },
  {
    folderId: "folder-789",
    variant: "interview",
    title: "백엔드 API 연동",
    description: "Swagger 명세 확인 및 에러 핸들링 정책 수립",
    createAt: "2026-04-07",
  },
  {
    folderId: "folder-789",
    variant: "interview",
    title: "백엔드 API 연동",
    description: "Swagger 명세 확인 및 에러 핸들링 정책 수립",
    createAt: "2026-04-07",
  },
];

export const Default: Story = {
  args: {
    initialData: mockData,
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
        description: "",
        createAt: "",
      },
    ],
  },
};
