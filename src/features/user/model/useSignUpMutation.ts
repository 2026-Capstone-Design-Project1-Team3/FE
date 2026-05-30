import { useMutation } from "@tanstack/react-query";

import { signUp } from "@/entities/user/api/signup";
import type { SignUpRequest } from "@/entities/user/model/types";

export const useSignUpMutation = () => {
  return useMutation({
    mutationFn: (payload: SignUpRequest) => signUp(payload),
  });
};
