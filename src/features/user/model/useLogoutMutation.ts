import { useMutation, useQueryClient } from "@tanstack/react-query";

import { logout } from "@/entities/user/api/logout";
import { queryKeys } from "@/shared/api/query-keys";

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      localStorage.removeItem("accessToken");
      await queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
