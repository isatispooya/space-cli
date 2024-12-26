import { useMutation, useQueryClient } from "@tanstack/react-query";
import { correspondenceService } from "../services";
import { CorrespondenceTypes } from "../types";

const useDeleteCorrespondence = () => {
  const queryClient = useQueryClient();

  return useMutation<CorrespondenceTypes, Error, number>({
    mutationKey: ["deleteCorrespondence"],
    mutationFn: (id: number) => correspondenceService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["correspondences"] });
    },
  });
};
export default useDeleteCorrespondence;


