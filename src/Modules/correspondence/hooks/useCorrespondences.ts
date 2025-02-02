import {
  useMutation,
  useQuery,
  UseMutationResult,
  UseQueryResult,
} from "@tanstack/react-query";
import { correspondenceService } from "../services";
import { CorrespondencePostType, CorrespondenceTypes } from "../types";
import { AxiosError } from "axios";
import { PaginatedResponse } from "../../../types/paginated";

const useCorrespondences = {
  useGet: (): UseQueryResult<
    PaginatedResponse<CorrespondenceTypes>,
    AxiosError
  > => {
    return useQuery({
      queryKey: ["correspondences"],
      queryFn: correspondenceService.get,
    });
  },

  useCreate: (): UseMutationResult<
    CorrespondenceTypes,
    AxiosError,
    CorrespondencePostType
  > => {
    return useMutation<CorrespondenceTypes, AxiosError, CorrespondencePostType>(
      {
        mutationKey: ["createCorrespondence"],
        mutationFn: (data: CorrespondencePostType) =>
          correspondenceService.create(data),
      }
    );
  },

  useUpdate: (): UseMutationResult<
    CorrespondenceTypes,
    AxiosError,
    { id: number; data: CorrespondenceTypes }
  > => {
    return useMutation({
      mutationKey: ["updateCorrespondence"],
      mutationFn: ({ id, data }) => correspondenceService.update(id, data),
    });
  },

  useDelete: (): UseMutationResult<void, AxiosError, number> => {
    return useMutation({
      mutationKey: ["deleteCorrespondence"],
      mutationFn: (id: number) => correspondenceService.delete(id),
    });
  },
};

export default useCorrespondences;
