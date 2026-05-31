import { useMutation, useQueryClient } from "@tanstack/react-query";

import { login } from "@/entities/user/api/login";
import type { LoginRequest } from "@/entities/user/model/types";
import { queryKeys } from "@/shared/api/query-keys";

export const useLoginMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => login(payload),
    onSuccess: async () => {
      // 로그인 성공 시 유저 관련 데이터를 최신화하기 위해 캐시를 날림
      await queryClient.invalidateQueries({ queryKey: queryKeys.user.all });
    },
  });
};
