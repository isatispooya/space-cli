import { useMutation, useQueryClient } from "@tanstack/react-query";
import { correspondenceService } from "../services";
import { CorrespondenceTypes } from "../types";

export const useUpdateCorrespondence = (id: string) => {
  const queryClient = useQueryClient();

  return useMutation<CorrespondenceTypes, Error, CorrespondenceTypes>({
    mutationKey: ["updateCorrespondence"],
    mutationFn: (data) => correspondenceService.update(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["correspondences"] });
    },
  });
};

export default useUpdateCorrespondence;
