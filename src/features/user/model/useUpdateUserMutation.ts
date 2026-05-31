import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateUser } from "@/entities/user/api/updateUser";
import type { UpdateUserRequest } from "@/entities/user/model/types";
import { queryKeys } from "@/shared/api/query-keys";

export const useUpdateUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserRequest) => updateUser(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
