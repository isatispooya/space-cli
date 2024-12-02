import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCorrespondence } from "../services";
import {
  CorrespondenceFormValues,
  UpdateCorrespondenceResponse,
} from "../types";

export const useUpdateCorrespondence = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<
    UpdateCorrespondenceResponse,
    Error,
    CorrespondenceFormValues
  >({
    mutationFn: (data) => updateCorrespondence(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["correspondences"] });
    },
  });
};

export default useUpdateCorrespondence;
