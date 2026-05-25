import type { UpdateUserRequest } from "@/entities/user/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const updateUser = (data: UpdateUserRequest) => {
  return apiClient.patch<string>(API_ENDPOINTS.user.update, {
    body: data,
  });
};
