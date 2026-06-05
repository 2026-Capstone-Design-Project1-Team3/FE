import { useQuery } from "@tanstack/react-query";

import { getFolderDetail } from "@/entities/folder/api/getFolderDetail";
import { queryKeys } from "@/shared/api/query-keys";

export const useFolderDetailQuery = (folderId: string | null) => {
  return useQuery({
    queryKey: queryKeys.folder.detail(folderId ?? ""),
    queryFn: () => getFolderDetail(folderId!),
    enabled: !!folderId,
  });
};
