import type { SignUpRequest } from "@/entities/user/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const signUp = (data: SignUpRequest) => {
  return apiClient.post<Record<string, unknown>>(API_ENDPOINTS.user.signUp, {
    body: data,
  });
};
