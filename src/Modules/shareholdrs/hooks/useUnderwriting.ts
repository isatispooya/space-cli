import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import { underwritingServices } from "../services";
import { UnderwritingType } from "../types/underwriting.type";
import { UnderwritingCreateType } from "../types/underwritingCreate.type";
import { AxiosError } from "axios";
import { IUnderwritingReportsType } from "../types/reports.type";

const useUnderwriting = {
  useGet: (): UseQueryResult<UnderwritingType[]> => {
    return useQuery({
      queryKey: ["underwriting"],
      queryFn: underwritingServices.get,
    });
  },

  useGetReports: (): UseQueryResult<IUnderwritingReportsType> => {
    return useQuery({
      queryKey: ["underwritingReports"],
      queryFn: underwritingServices.getReports,
    });
  },

  useCreate: (): UseMutationResult<
    { redirect_url?: string },
    AxiosError<unknown>,
    UnderwritingCreateType
  > => {
    return useMutation({
      mutationKey: ["createUnderwriting"],
      mutationFn: (data: UnderwritingCreateType) =>
        underwritingServices.create(data),
    });
  },

  useUpdate: (): UseMutationResult<
    UnderwritingType,
    Error,
    UnderwritingType
  > => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationKey: ["updateUnderwriting"],
      mutationFn: (data: UnderwritingType) =>
        underwritingServices.update(data),

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ["underwriting"] });
      },
    });
  },

  useDelete: (): UseMutationResult<void, Error, number> => {
    return useMutation({
      mutationKey: ["deleteUnderwriting"],
      mutationFn: (id: number) => underwritingServices.delete(id),
    });
  },

  useGetById: (id: number): UseQueryResult<UnderwritingType> => {
    return useQuery({
      queryKey: ["underwriting", id],
      queryFn: () => underwritingServices.getById(id),
      enabled: !!id,
    });
  },
};

export default useUnderwriting;
