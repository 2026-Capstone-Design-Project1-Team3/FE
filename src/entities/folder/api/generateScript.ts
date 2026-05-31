import type {
  GenerateScriptRequest,
  GenerateScriptResponse,
} from "@/entities/folder/model/types";
import { apiClient } from "@/shared/api/client";
import { API_ENDPOINTS } from "@/shared/api/endpoints";

export const generateScript = (data: GenerateScriptRequest) => {
  return apiClient.post<GenerateScriptResponse>(
    API_ENDPOINTS.folder.outputText,
    {
      body: data,
    },
  );
};
