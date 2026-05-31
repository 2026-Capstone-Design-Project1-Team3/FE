import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const checkLoginId = (loginId: string) => {
  return apiClient.get<Record<string, unknown>>(
    API_ENDPOINTS.user.checkId(loginId),
  );
};
