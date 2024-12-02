import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCorrespondence, DeleteCorrespondenceResponse } from '../services/correspondence.delete';

export const useDeleteCorrespondence = () => {
  const queryClient = useQueryClient();

  return useMutation<DeleteCorrespondenceResponse, Error, number>({
    mutationFn: deleteCorrespondence,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["correspondences"] });
    }
  });
}; 