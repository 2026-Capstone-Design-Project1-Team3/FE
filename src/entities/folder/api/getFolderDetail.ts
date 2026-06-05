import type { FolderDetailResponse } from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getFolderDetail = (folderId: string) => {
  return apiClient.get<FolderDetailResponse>(
    API_ENDPOINTS.folder.detail(folderId),
  );
};
