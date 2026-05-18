import type { Meta, StoryObj } from "@storybook/react-vite";

import { FolderSessionList } from "./FolderSessionList";

const meta: Meta<typeof FolderSessionList> = {
  title: "UI/FolderDetail/FolderSessionList",
  component: FolderSessionList,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FolderSessionList>;

export const Default: Story = {
  args: {
    sessions: [
      {
        id: "session-001",
        title: "2분기 실적 발표 리허설",
        type: "발표",
        date: "2024.05.20",
      },
      {
        id: "session-002",
        title: "글로벌 테크 마케팅 직무 면접",
        type: "면접",
        date: "2024.05.18",
      },
      {
        id: "session-003",
        title: "신규 프로젝트 제안 스피치",
        type: "발표",
        date: "2024.05.15",
      },
    ],
    currentPage: 1,
    totalPages: 5,
  },
};
