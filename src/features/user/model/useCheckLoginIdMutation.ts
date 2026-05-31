import { useMutation } from "@tanstack/react-query";

import { checkLoginId } from "@/entities/user/api/checkLoginId";

export const useCheckLoginIdMutation = () => {
  return useMutation({
    mutationFn: (loginId: string) => checkLoginId(loginId),
  });
};
