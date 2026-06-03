import { useMutation } from "@tanstack/react-query";

import { getPresignedUrl } from "@/entities/file/api/getPresignedUrl";
import { uploadFileToPresignedUrl } from "@/entities/file/api/uploadFileToPresignedUrl";

export const useUploadPdfFileMutation = () => {
  return useMutation({
    mutationFn: async (file: File) => {
      const { fileKey, uploadUrl } = await getPresignedUrl(file.name);

      if (!uploadUrl || !fileKey) {
        throw new Error("파일 업로드 URL을 발급받지 못했습니다.");
      }

      await uploadFileToPresignedUrl(uploadUrl, file);

      return {
        fileKey,
        fileName: file.name,
      };
    },
  });
};
