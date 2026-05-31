import type { FolderInsightSummaryProps } from "@/shared/ui/FolderDetail/FolderInsightSummary/FolderInsightSummary";
import type { RecordTableRowProps } from "@/shared/ui/MainSection/RecordSection/RecordTableRow";

export const folderRecords: RecordTableRowProps[] = [
  {
    analysisId: "presentation-session-001",
    variant: "presentation",
    title: "2분기 실적 발표 리허설",
    createdAt: "2024.05.20",
  },
  {
    analysisId: "presentation-session-002",
    variant: "presentation",
    title: "글로벌 테크 마케팅 직무 면접",
    createdAt: "2024.05.18",
  },
  {
    analysisId: "presentation-session-003",
    variant: "presentation",
    title: "신규 프로젝트 제안 스피치",
    createdAt: "2024.05.15",
  },
  {
    analysisId: "presentation-session-004",
    variant: "presentation",
    title: "연말 성과 리뷰 PT",
    createdAt: "2024.05.10",
  },
  {
    analysisId: "presentation-session-005",
    variant: "presentation",
    title: "팀 리더십 커뮤니케이션 세션",
    createdAt: "2024.05.08",
  },
  {
    analysisId: "presentation-session-006",
    variant: "presentation",
    title: "분기별 KPI 공유 발표",
    createdAt: "2024.05.04",
  },
  {
    analysisId: "presentation-session-007",
    variant: "presentation",
    title: "영업 전략 업데이트 발표",
    createdAt: "2024.05.01",
  },
  {
    analysisId: "presentation-session-008",
    variant: "presentation",
    title: "제품 개선안 리뷰 발표",
    createdAt: "2024.04.28",
  },
  {
    analysisId: "presentation-session-009",
    variant: "presentation",
    title: "신규 고객사 제안 발표",
    createdAt: "2024.04.24",
  },
  {
    analysisId: "presentation-session-010",
    variant: "presentation",
    title: "사내 기술 공유 세션",
    createdAt: "2024.04.20",
  },
  {
    analysisId: "presentation-session-011",
    variant: "presentation",
    title: "브랜드 캠페인 결과 발표",
    createdAt: "2024.04.17",
  },
  {
    analysisId: "presentation-session-012",
    variant: "presentation",
    title: "리더십 피드백 발표",
    createdAt: "2024.04.13",
  },
  {
    analysisId: "presentation-session-013",
    variant: "presentation",
    title: "서비스 운영 지표 발표",
    createdAt: "2024.04.10",
  },
  {
    analysisId: "presentation-session-014",
    variant: "presentation",
    title: "시장 조사 결과 발표",
    createdAt: "2024.04.06",
  },
];

export const folderInsights: FolderInsightSummaryProps["insights"] = [
  {
    label: "strengths",
    title: "Strengths",
    description:
      "명확한 논리 구조와 자신감 있는 목소리 톤이 일관되게 유지되고 있습니다.",
    tone: "positive",
  },
  {
    label: "growth-areas",
    title: "Growth Areas",
    description:
      "질의응답 시 불필요한 추임새(어, 음) 빈도를 줄이면 더욱 전문적으로 보입니다.",
    tone: "growth",
  },
];
