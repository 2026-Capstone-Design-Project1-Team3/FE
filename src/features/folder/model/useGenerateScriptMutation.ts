import { useMutation } from "@tanstack/react-query";

import { generateScript } from "@/entities/folder/api/generateScript";
import type { GenerateScriptRequest } from "@/entities/folder/model/types";

export const useGenerateScriptMutation = () => {
  return useMutation({
    mutationFn: (payload: GenerateScriptRequest) => generateScript(payload),
  });
};
