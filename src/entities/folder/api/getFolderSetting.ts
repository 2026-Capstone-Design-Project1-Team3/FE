import type { FolderSettingResponse } from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const getFolderSetting = (folderId: string) => {
  return apiClient.post<FolderSettingResponse>(
    API_ENDPOINTS.folder.setting(folderId),
  );
};
