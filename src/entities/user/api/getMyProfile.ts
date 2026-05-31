import type { UserProfile } from "@/entities/user/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getMyProfile = () => {
  return apiClient.get<UserProfile>(API_ENDPOINTS.user.me);
};
