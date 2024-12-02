import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCorrespondence } from "../services";
import { DeleteCorrespondenceResponse } from "../types";

const useDeleteCorrespondence = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteCorrespondenceResponse, Error, number>({
    mutationFn: deleteCorrespondence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["correspondences"] });
    },
  });
};
export default useDeleteCorrespondence;
