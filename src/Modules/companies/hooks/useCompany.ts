import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { companiesService } from "../services";
import { CompanyPostType, CompanyType, CompanyResponseType, CompanyListType } from "../types";
import { AxiosError } from "axios";

const useCompany = {
  useGet: (): UseQueryResult<CompanyListType[], AxiosError> => {
    return useQuery({
      queryKey: ["companies"],
      queryFn: companiesService.get,
    });
  },
  useCreate: (): UseMutationResult<CompanyPostType, Error, FormData> => {
    return useMutation({
      mutationKey: ["createCompany"],
      mutationFn: (data: FormData) => companiesService.create(data),
      onError: (error) => {
        console.error("Mutation error:", error);
      },
    });
  },

  useUpdate: (): UseMutationResult<
    CompanyPostType,
    Error,
    { id: number; data: CompanyPostType }
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
  usePostCompanyRasmio: (): UseMutationResult<CompanyResponseType, Error, FormData> => {
    return useMutation({
      mutationKey: ["postCompanyRasmio"],
      mutationFn: (data: FormData) => companiesService.postCompanyRasmio(data),
    });
  },

  useGetCompanyRasmio: (id?: number): UseQueryResult<CompanyListType | CompanyType, AxiosError> => {
    return useQuery({
      queryKey: id ? ["companyRasmio", id] : ["companyRasmio"],
      queryFn: () => companiesService.getCompanyRasmio(id),
      select: (data: CompanyListType | CompanyType) => {
        console.log('دریافت اطلاعات شرکت با موفقیت انجام شد:', data);
        return data;
      }
    });
  },
};

export default useCompany;
