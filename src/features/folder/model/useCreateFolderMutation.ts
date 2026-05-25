import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createFolder } from "@/entities/folder/api/createFolder";
import type { CreateFolderRequest } from "@/entities/folder/model/types";
import { queryKeys } from "@/shared/api/query-keys";

export const useCreateFolderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateFolderRequest) => createFolder(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.folder.list(),
      });
    },
  });
};
