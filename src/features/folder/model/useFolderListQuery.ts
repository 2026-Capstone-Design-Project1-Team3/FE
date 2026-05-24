import { useQuery } from "@tanstack/react-query";

import { getFolders } from "@/entities/folder/api/getFolders";
import type { FolderListQuery } from "@/entities/folder/model/types";
import { queryKeys } from "@/shared/api/query-keys";

// API 파라미터 타입에 컴포넌트 제어용(enabled) 옵션을 확장
interface UseFolderListQueryOptions extends FolderListQuery {
  enabled?: boolean;
}

export const useFolderListQuery = (options: UseFolderListQueryOptions = {}) => {
  const { enabled = true, ...params } = options;

  return useQuery({
    enabled,
    queryFn: () => getFolders(params),
    // 파라미터가 바뀌면 새로운 키로 인식하게 params를 키에 포함시킴
    queryKey: queryKeys.folder.list(params),
  });
};
