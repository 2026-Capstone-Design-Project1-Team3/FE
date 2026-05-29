import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteUser } from "@/entities/user/api/deleteUser";
import { queryKeys } from "@/shared/api/query-keys";

export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: async () => {
      localStorage.removeItem("accessToken");
      await queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
