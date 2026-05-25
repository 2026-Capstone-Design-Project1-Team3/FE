import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const logout = () => {
  return apiClient.post<string>(API_ENDPOINTS.user.logout);
};
