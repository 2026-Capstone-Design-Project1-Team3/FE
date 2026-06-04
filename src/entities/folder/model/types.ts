export type FolderListQuery = {
  type?: number;
  limit?: number;
  page?: number;
  how?: number;
  keyWord?: string;
};

export interface FolderInfo {
  folderId: string;
  title: string;
  type: number;
  updatedAt: string;
  totalAnalyses: number;
}

export interface CreateFolderRequest {
  title?: string;
  fileName?: string;
  fileKey?: string;
  extraInfo?: string;
  companyName?: string;
  inputText?: string;
  type?: number;
}

export interface GenerateScriptRequest {
  fileKey?: string;
  extraInfo?: string;
}

export interface GenerateScriptResponse {
  extraInfo?: string;
}

export interface DeleteFolderRequest {
  folderId?: string[];
}

export type FolderListResponse = FolderInfo[];

export interface FolderSettingResponse {
  [key: string]: unknown;
}

export interface FolderStatisticsResponse {
  gazeScore: number;
  speedScore: number;
  finalScore: number;
}
