import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCorrespondence } from "../services";
import { CorrespondenceTypes } from "../types";

export const useUpdateCorrespondence = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<CorrespondenceTypes, Error, CorrespondenceTypes>({
    mutationFn: (data) => updateCorrespondence(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["correspondences"] });
    },
  });
};

export default useUpdateCorrespondence;
