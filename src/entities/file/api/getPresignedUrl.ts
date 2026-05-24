import type { PresignedUrlResponse } from "@/entities/file/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getPresignedUrl = (fileName: string) => {
  return apiClient.get<PresignedUrlResponse>(
    API_ENDPOINTS.file.presignedUrl(fileName),
  );
};
