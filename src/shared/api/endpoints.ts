export const API_ENDPOINTS = {
  user: {
    signUp: "/user/signUp",
    login: "/user/login",
    logout: "/user/logout",
    me: "/user/me",
    update: "/user",
    delete: "/user/delete",
    eye: "/user/eye", // GET, POST 둘 다 같은 주소 사용
    checkId: (loginId: string) => `/user/check/${loginId}`,
  },
  folder: {
    base: "/folder", // GET (목록 조회), POST (생성)
    delete: "/folder/delete",
    outputText: "/folder/outputText",
    setting: (folderId: string) => `/folder/setting/${folderId}`,
    statistics: (folderId: string) => `/folder/statistics/${folderId}`,
  },
  analysis: {
    delete: "/analysis/delete",
    cardNews: "/analysis/cardNews",
    detail: (analysisId: string) => `/analysis/${analysisId}`,
    statistics: (limit: number) => `/analysis/statistics/${limit}`,
  },
  file: {
    presignedUrl: (fileName: string) =>
      `/files/presignedUrl/${encodeURIComponent(fileName)}`,
  },
} as const;
