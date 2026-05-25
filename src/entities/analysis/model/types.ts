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

export interface AnalysisDetailResponse {
  [key: string]: unknown;
}

export interface AnalysisStatisticsResponse {
  [key: string]: unknown;
}

export interface CardNewsResponse {
  [key: string]: unknown;
}
