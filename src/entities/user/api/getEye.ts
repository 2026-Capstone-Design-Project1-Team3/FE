import type { UserEyeRequest } from "@/entities/user/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";
import { isApiHttpError } from "@/shared/api/http-error";

export const getEye = async (): Promise<null | UserEyeRequest> => {
  try {
    return await apiClient.get<UserEyeRequest>(API_ENDPOINTS.user.eye);
  } catch (error) {
    if (isApiHttpError(error) && error.status === 403) {
      return null;
    }
    throw error;
  }
};
