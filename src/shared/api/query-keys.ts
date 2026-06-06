interface FolderListParams {
  type?: number;
  limit?: number;
  page?: number;
  how?: number;
  keyWord?: string;
}

interface CardNewsParams extends FolderListParams {
  folderId?: string;
}

export const queryKeys = {
  user: {
    all: ["user"] as const,
    me: () => ["user", "me"] as const,
    eye: () => ["user", "eye"] as const,
    checkId: (loginId: string) => ["user", "checkId", loginId] as const,
  },
  folder: {
    all: ["folder"] as const,
    list: (params?: FolderListParams) => ["folder", "list", params] as const,
    detail: (folderId: string) => ["folder", "detail", folderId] as const,
    setting: (folderId: string) => ["folder", "setting", folderId] as const,
    statistics: (folderId: string) =>
      ["folder", "statistics", folderId] as const,
  },
  analysis: {
    all: ["analysis"] as const,
    detail: (analysisId: string | null) =>
      ["analysis", "detail", analysisId] as const,
    statistics: (limit: number) => ["analysis", "statistics", limit] as const,
    cardNews: (params?: CardNewsParams) =>
      ["analysis", "cardNews", params] as const,
  },
  file: {
    all: ["file"] as const,
    presignedUrl: (fileName: string) =>
      ["file", "presignedUrl", fileName] as const,
  },
};
