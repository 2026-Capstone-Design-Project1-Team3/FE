import type {
  FolderListQuery,
  FolderListResponse,
} from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getFolders = (params?: FolderListQuery) => {
  return apiClient.get<FolderListResponse>(API_ENDPOINTS.folder.base, {
    params,
  });
};
