import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { underwritingServices } from "../services";
import { underwritingCreateTypes, underwritingTypes } from "../types";

const useUnderwriting = {
  useGet: (): UseQueryResult<underwritingTypes[]> => {
    return useQuery({
      queryKey: ["underwriting"],
      queryFn: underwritingServices.get,
    });
  },

  useCreate: (): UseMutationResult<
    { redirect_url?: string },
    Error,
    underwritingCreateTypes
  > => {
    return useMutation({
      mutationKey: ["createUnderwriting"],
      mutationFn: (data: underwritingCreateTypes) =>
        underwritingServices.create(data),
    });
  },

  useUpdate: (): UseMutationResult<
    underwritingTypes,
    Error,
    underwritingTypes
  > => {
    return useMutation({
      mutationKey: ["updateUnderwriting"],
      mutationFn: (data: underwritingTypes) =>
        underwritingServices.update(data),
    });
  },

  useDelete: (): UseMutationResult<void, Error, number> => {
    return useMutation({
      mutationKey: ["deleteUnderwriting"],
      mutationFn: (id: number) => underwritingServices.delete(id),
    });
  },
};

export default useUnderwriting;
