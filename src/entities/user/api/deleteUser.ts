import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const deleteUser = () => {
  return apiClient.delete<Record<string, unknown>>(API_ENDPOINTS.user.delete);
};
