import type { UserEyeRequest } from "@/entities/user/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const setEye = (data: UserEyeRequest, secret: string) => {
  return apiClient.post<Record<string, unknown>>(API_ENDPOINTS.user.eye, {
    body: data,
    headers: {
      "X-Internal-Secret": secret,
    },
  });
};
