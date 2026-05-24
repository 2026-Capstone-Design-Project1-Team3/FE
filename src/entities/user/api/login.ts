import type { LoginRequest } from "@/entities/user/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const login = (data: LoginRequest) => {
  return apiClient.post<string>(API_ENDPOINTS.user.login, {
    body: data,
  });
};
