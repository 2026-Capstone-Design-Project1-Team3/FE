import { useQuery } from "@tanstack/react-query";

import { getEye } from "@/entities/user/api/getEye";
import { queryKeys } from "@/shared/api/query-keys";

export const useUserEyeQuery = () => {
  return useQuery({
    queryFn: getEye,
    queryKey: queryKeys.user.eye(),
    refetchOnMount: "always",
  });
};
