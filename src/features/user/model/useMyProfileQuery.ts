import { useQuery } from "@tanstack/react-query";

import { getMyProfile } from "@/entities/user/api/getMyProfile";
import { queryKeys } from "@/shared/api/query-keys";

interface UseMyProfileQueryOptions {
  enabled?: boolean;
}

export const useMyProfileQuery = (options: UseMyProfileQueryOptions = {}) => {
  const { enabled = true } = options;

  return useQuery({
    enabled,
    queryFn: getMyProfile,
    queryKey: queryKeys.user.me(),
  });
};
