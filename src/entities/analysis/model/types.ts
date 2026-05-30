export interface DeleteAnalysisRequest {
  analysisId?: string[];
}

export type CardNewsQuery = {
  folderId?: string;
  type?: number;
  limit?: number;
  page?: number;
  how?: number;
  keyWord?: string;
};

export interface CardNewsItem {
  analysisId: string;
  title: string;
  type: number; // 0: 발표, 1: 면접
  createdAt: string;
}

export interface CardNewsResponse {
  total: number;
  cardnews: CardNewsItem[];
}

export interface AnalysisDetailResponse {
  [key: string]: unknown;
}

export interface AnalysisStatisticsResponse {
  [key: string]: unknown;
}

export interface CardNewsResponse {
  [key: string]: unknown;
}
