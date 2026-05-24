import type { CreateFolderRequest } from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const createFolder = (data: CreateFolderRequest) => {
  return apiClient.post<Record<string, unknown>>(API_ENDPOINTS.folder.base, {
    body: data,
  });
};
