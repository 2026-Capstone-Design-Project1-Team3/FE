import { useQuery } from "@tanstack/react-query";

import { getCardNews } from "@/entities/analysis/api/getCardNews";
import type { CardNewsQuery } from "@/entities/analysis/model/types";
import { queryKeys } from "@/shared/api/query-keys";

interface UseCardNewsQueryOptions {
  params?: CardNewsQuery;
  enabled?: boolean;
}

export const useCardNewsQuery = (options: UseCardNewsQueryOptions = {}) => {
  const { params, enabled = true } = options;

  return useQuery({
    queryKey: queryKeys.analysis.cardNews(params),
    queryFn: () => getCardNews(params),
    enabled,
  });
};
