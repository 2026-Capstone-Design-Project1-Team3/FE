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
  analysisId: string;
  folderId: string;
  title: string;
  type: number;
  summary: string;
  createdAt: string;
  gazeScore: number;
  gazeDistribution: {
    screen: number;
    camera: number;
  };
  fluencyLevel: 0 | 1 | 2;
  fluencyFeedback: string;
  speedScore: number;
  speedDistribution: {
    fast: number;
    optimal: number;
    slow: number;
  };
  gestureFeedbackWord: string;
  gestureFeedbackSentence: string;
  finalScore: number;
  finalFeedback: string;
  transcript: string;
  videoUrl?: string;
}

export interface AnalysisStatisticItem {
  gazeScore: number;
  speedScore: number;
}

export interface AnalysisStatisticsResponse {
  total: number;
  statistics: AnalysisStatisticItem[];
}
