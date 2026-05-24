import type { DeleteFolderRequest } from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const deleteFolder = (data: DeleteFolderRequest) => {
  return apiClient.post<Record<string, unknown>>(API_ENDPOINTS.folder.delete, {
    body: data,
  });
};
