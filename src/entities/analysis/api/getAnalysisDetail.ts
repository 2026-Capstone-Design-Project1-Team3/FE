import type { AnalysisDetailResponse } from "@/entities/analysis/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getAnalysisDetail = (analysisId: string) => {
  return apiClient.get<AnalysisDetailResponse>(
    API_ENDPOINTS.analysis.detail(analysisId),
  );
};
