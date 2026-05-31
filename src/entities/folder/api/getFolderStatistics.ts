import type { FolderStatisticsResponse } from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getFolderStatistics = (folderId: string) => {
  return apiClient.get<FolderStatisticsResponse>(
    API_ENDPOINTS.folder.statistics(folderId),
  );
};
