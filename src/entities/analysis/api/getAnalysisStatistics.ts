import type { AnalysisStatisticsResponse } from "@/entities/analysis/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getAnalysisStatistics = (limit: number) => {
  return apiClient.get<AnalysisStatisticsResponse>(
    API_ENDPOINTS.analysis.statistics(limit),
  );
};
