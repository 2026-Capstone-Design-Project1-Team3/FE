import { useQuery } from "@tanstack/react-query";

import { getAnalysisDetail } from "@/entities/analysis/api/getAnalysisDetail";
import { queryKeys } from "@/shared/api/query-keys";

export const useAnalysisDetailQuery = (analysisId?: string | null) => {
  return useQuery({
    enabled: Boolean(analysisId),
    queryFn: () => getAnalysisDetail(analysisId ?? ""),
    queryKey: queryKeys.analysis.detail(analysisId ?? ""),
  });
};
