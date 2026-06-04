import { useQuery } from "@tanstack/react-query";

import { getFolderStatistics } from "@/entities/folder/api/getFolderStatistics";
import { queryKeys } from "@/shared/api/query-keys";

interface UseFolderStatisticsQueryOptions {
  enabled?: boolean;
  folderId?: string;
}

export const useFolderStatisticsQuery = ({
  enabled = true,
  folderId,
}: UseFolderStatisticsQueryOptions) => {
  return useQuery({
    enabled: enabled && Boolean(folderId),
    queryFn: () => getFolderStatistics(folderId ?? ""),
    queryKey: queryKeys.folder.statistics(folderId ?? ""),
  });
};
