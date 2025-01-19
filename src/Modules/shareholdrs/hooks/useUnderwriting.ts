import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { underwritingServices } from "../services";
import { underwritingTypes } from "../types/underwriting.type";
import { underwritingCreateTypes } from "../types/underwritingCreate.type";
import { AxiosError } from "axios";


const useUnderwriting = {
  useGet: (): UseQueryResult<underwritingTypes[]> => {
    return useQuery({
      queryKey: ["underwriting"],
      queryFn: underwritingServices.get,
    });
  },

  useCreate: (): UseMutationResult<
    { redirect_url?: string },
    AxiosError<unknown>,
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

  useGetById: (id: number): UseQueryResult<underwritingTypes> => {
    return useQuery({
      queryKey: ["underwriting", id],
      queryFn: () => underwritingServices.getById(id),
      enabled: !!id,
    });
  },
};

export default useUnderwriting;
