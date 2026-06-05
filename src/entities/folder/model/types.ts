export type FolderListQuery = {
  type?: number;
  limit?: number;
  page?: number;
  how?: number;
  keyWord?: string;
};

export interface CreateFolderRequest {
  title: string;
  fileName: string;
  fileKey: string;
  extraInfo: string;
  companyName: string;
  inputText: string;
  type: number;
}

export interface CreateFolderResponse {
  folderId: string;
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

export interface FolderInfo {
  folderId: string;
  title: string;
  type: number;
  updatedAt: string;
  totalAnalyses: number;
}

export interface FolderDetailResponse {
  title: string;
  fileName: string;
  extraInfo: string;
  companyName: string;
  inputText: string;
}

export type FolderListResponse = FolderInfo[];

export interface EyeCalibration {
  leftEyeOffset: number;
  rightEyeOffset: number;
  ratio: number;
}

export interface FolderSettingResponse {
  set: string;
  eyeCalibration: EyeCalibration | null;
}

export interface FolderStatisticsResponse {
  [key: string]: unknown;
}
