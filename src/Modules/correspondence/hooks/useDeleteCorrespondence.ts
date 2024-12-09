import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCorrespondence } from "../services";
import { CorrespondenceTypes } from "../types";

const useDeleteCorrespondence = () => {
  const queryClient = useQueryClient();

  return useMutation<CorrespondenceTypes, Error, number>({
    mutationFn: deleteCorrespondence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["correspondences"] });
    },
  });
};
export default useDeleteCorrespondence;
