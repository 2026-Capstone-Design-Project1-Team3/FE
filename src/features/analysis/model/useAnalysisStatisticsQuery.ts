import { useQuery } from "@tanstack/react-query";

import { getAnalysisStatistics } from "@/entities/analysis/api/getAnalysisStatistics";
import { queryKeys } from "@/shared/api/query-keys";

export const useAnalysisStatisticsQuery = (limit: number) => {
  return useQuery({
    queryFn: () => getAnalysisStatistics(limit),
    queryKey: queryKeys.analysis.statistics(limit),
  });
};
