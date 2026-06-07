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

export interface GazeDistribution {
  screen: number;
  camera: number;
}

export interface SpeedDistribution {
  fast: number;
  optimal: number;
  slow: number;
}

export interface AnalysisDetailResponse {
  analysisId: string;
  folderId: string;
  title: string;
  type: number; // 0: 발표, 1: 면접
  summary: string;
  createdAt: string;
  gazeScore: number;
  gazeFeedback: string;
  gazeDistribution: GazeDistribution;
  fluencyLevel: number; // 0: 하, 1: 중, 2: 상
  fluencyFeedback: string;
  speedScore: number;
  speedSpm: number;
  speedDistribution: SpeedDistribution;
  gestureFeedbackWord: string;
  gestureFeedbackSentence: string;
  finalScore: number;
  finalFeedback: string; // <q>로 구분: 총평<q>강점1<q>강점2<q>개선1<q>개선2
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
