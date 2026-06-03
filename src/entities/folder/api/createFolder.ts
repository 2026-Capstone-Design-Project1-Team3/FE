import type {
  CreateFolderRequest,
  CreateFolderResponse,
} from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const createFolder = (data: CreateFolderRequest) => {
  return apiClient.post<CreateFolderResponse>(API_ENDPOINTS.folder.base, {
    body: data,
  });
};
