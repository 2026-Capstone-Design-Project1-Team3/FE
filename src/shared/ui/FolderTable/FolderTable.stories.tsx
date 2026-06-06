import type { Meta, StoryObj } from "@storybook/react-vite";
import { MemoryRouter } from "react-router-dom";

import { FolderTable } from "./FolderTable";

const meta = {
  title: "UI/FolderTable",
  component: FolderTable,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div className="bg-background-primary min-h-screen p-16">
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
} satisfies Meta<typeof FolderTable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    records: [
      {
        folderId: "folder-001",
        variant: "interview",
        title: "2024년 하반기 삼성전자 공채 대비",
        subTitle: "기본 역량 및 기술 스택 검증",
        createAt: "2024.11.15",
        videoCount: 12,
      },
      {
        folderId: "folder-002",
        variant: "interview",
        title: "네이버 프론트엔드 2차 기술 면접",
        subTitle: "아키텍처 및 라이브 코딩 피드백",
        createAt: "2024.11.12",
        videoCount: 4,
      },
      {
        folderId: "folder-003",
        variant: "interview",
        title: "영어 회화 실전 모의 테스트",
        subTitle: "외국계 기업 비즈니스 매너 연습",
        createAt: "2024.11.08",
        videoCount: 8,
      },
      {
        folderId: "folder-004",
        variant: "interview",
        title: "임원진 C-Level 인터뷰",
        subTitle: "리더십 및 전략적 사고 측정",
        createAt: "2024.11.05",
        videoCount: 3,
      },
      {
        folderId: "folder-005",
        variant: "presentation",
        title: "데이터 분석가 직무 통합 연습",
        subTitle: "통계 및 SQL 문제 풀이 과정 녹화",
        createAt: "2024.10.29",
        videoCount: 157,
      },
      {
        folderId: "folder-006",
        variant: "presentation",
        title: "서비스 개선안 발표 리허설",
        subTitle: "발표 흐름 및 질의응답 대비",
        createAt: "2024.10.21",
        videoCount: 6,
      },
    ],
    itemsPerPage: 5,
  },
};

export const Disabled: Story = {
  args: {
    records: [],
  },
};

export const EdgeCase: Story = {
  args: {
    records: [
      {
        folderId: "folder-long-title",
        variant: "presentation",
        title:
          "매우 긴 폴더명과 긴 설명이 함께 들어오는 발표 연습 기록 테이블 표시 확인",
        subTitle: "긴 보조 설명이 들어와도 한 줄로 안정적으로 잘립니다.",
        createAt: "날짜 정보 없음",
        videoCount: 999,
      },
    ],
  },
};
