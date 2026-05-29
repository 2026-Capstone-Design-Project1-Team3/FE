import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendCalibrationChunk } from "@/entities/user/api/sendCalibrationChunk";
import type { SendCalibrationChunkPayload } from "@/entities/user/model/types";
import { queryKeys } from "@/shared/api/query-keys";

export const useSendCalibrationChunkMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SendCalibrationChunkPayload) =>
      sendCalibrationChunk(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: queryKeys.user.eye() });
    },
  });
};
