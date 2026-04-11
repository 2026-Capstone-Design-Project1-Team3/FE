import type { RecordCardProps } from "@/shared/ui/Card/RecordCard/RecordCard"; // 경로에 맞게 수정하세요

export const MOCK_RECORDS: RecordCardProps[] = [
  {
    folderId: "folder-001",
    variant: "interview",
    title: "2026 상반기 토스 프론트엔드 면접",
    description: "1차 기술 면접 준비 - 리액트 및 웹 성능 최적화 질문 대비",
    createAt: "2026-03-20",
  },
  {
    folderId: "folder-002",
    variant: "presentation",
    title: "신규 프로젝트 기획안 발표",
    description: "팀 내 주간 회의 - 서비스 아키텍처 및 마일스톤 공유",
    createAt: "2026-03-18",
  },
  {
    folderId: "folder-003",
    variant: "interview",
    title: "현대자동차 수시 채용 면접",
    description: "인성 및 직무 역량 면접 - 협업 경험 위주",
    createAt: "2026-03-15",
  },
  {
    folderId: "folder-004",
    variant: "presentation",
    title: "기술 세미나 - Tailwind CSS 활용법",
    description: "전사 개발자 대상 효율적인 스타일링 가이드 발표",
    createAt: "2026-03-10",
  },
  {
    folderId: "folder-005",
    variant: "interview",
    title: "네이버 클라우드 인턴 면접",
    description: "CS 기초 및 알고리즘 풀이 과정 설명 연습",
    createAt: "2026-03-05",
  },
];
