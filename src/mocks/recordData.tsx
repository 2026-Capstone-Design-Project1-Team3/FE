import type { RecordTableRowProps } from "@/shared/ui/MainSection/RecordSection/RecordTableRow"; // 경로에 맞게 수정하세요

export const MOCK_RECORDS: RecordTableRowProps[] = [
  {
    folderId: "folder-001",
    variant: "interview",
    title: "2026 상반기 토스 프론트엔드 면접",
    createAt: "2026/03/20",
  },
  {
    folderId: "folder-002",
    variant: "presentation",
    title: "신규 프로젝트 기획안 발표",
    createAt: "2026/03/18",
  },
  {
    folderId: "folder-003",
    variant: "interview",
    title: "현대자동차 수시 채용 면접",
    createAt: "2026/03/15",
  },
  {
    folderId: "folder-004",
    variant: "presentation",
    title: "기술 세미나 - Tailwind CSS 활용법",
  },
  {
    folderId: "folder-005",
    variant: "interview",
    title: "네이버 클라우드 인턴 면접",
    createAt: "2026/03/05",
  },
];
