import type { DeleteAnalysisRequest } from "@/entities/analysis/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const deleteAnalysis = (data: DeleteAnalysisRequest) => {
  return apiClient.post<Record<string, unknown>>(
    API_ENDPOINTS.analysis.delete,
    {
      body: data,
    },
  );
};
