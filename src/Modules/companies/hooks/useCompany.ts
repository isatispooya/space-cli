import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { companiesService } from "../services";
import { companypostTypes, CompanyTypes } from "../types";
import { AxiosError } from "axios";

const useCompany = {
  useGet: (): UseQueryResult<CompanyTypes[], AxiosError> => {
    return useQuery({
      queryKey: ["companies"],
      queryFn: companiesService.get,
    });
  },
  useCreate: (): UseMutationResult<companypostTypes, Error, FormData> => {
    return useMutation({
      mutationKey: ["createCompany"],
      mutationFn: (data: FormData) => companiesService.create(data),
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  },

  useUpdate: (): UseMutationResult<
    companypostTypes,
    Error,
    { id: number; data: companypostTypes }
  > => {
    return useMutation({
      mutationKey: ["updateCompany"],
      mutationFn: ({ id, data }) => companiesService.update(id, data),
    });
  },
  useDelete: (): UseMutationResult<void, Error, number> => {
    return useMutation({
      mutationKey: ["deleteCompany"],
      mutationFn: (id: number) => companiesService.delete(id),
    });
  },
};

export default useCompany;
