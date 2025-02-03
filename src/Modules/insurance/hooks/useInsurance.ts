import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { insuranceService } from "../services";
import { AxiosError } from "axios";
import {
  InsurancePostTypes,
  InsuranceRequestPostTypes,
  InsuranceTypes,
} from "../types";

const useInsurance = {
  useGetFields: (): UseQueryResult<InsuranceTypes[]> =>
    useQuery({
      queryKey: ["insurance-fields"],
      queryFn: insuranceService.getFields,
    }),

  useGetRequests: () =>
    useQuery({
      queryKey: ["insurance-requests"],
      queryFn: insuranceService.getRequests,
    }),

  useGetRequestsById: (id?: number) =>
    useQuery({
      queryKey: ["insurance-requests", id],
      queryFn: () => insuranceService.getRequestsById(id ?? 0),
    }),

  usePostFields: (): UseMutationResult<
    InsurancePostTypes,
    AxiosError<unknown>,
    InsurancePostTypes
  > =>
    useMutation({
      mutationKey: ["insurance-requests"],
      mutationFn: insuranceService.postFields,
    }),

  usePostRequest: (
    id?: string
  ): UseMutationResult<
    InsuranceRequestPostTypes,
    AxiosError<unknown>,
    FormData
  > =>
    useMutation({
      mutationKey: ["insurance-requests", id],
      mutationFn: (data: FormData) => insuranceService.postRequest(data),
    }),

  useUpdateRequest: (
    id?: string
  ): UseMutationResult<
    InsuranceRequestPostTypes,
    AxiosError<unknown>,
    FormData
  > =>
    useMutation({
      mutationKey: ["insurance-requests", id],
      mutationFn: (data: FormData) =>
        insuranceService.updateRequest(data, id ? Number(id) : 0),
    }),

  useGetInsuranceCompanies: (): UseQueryResult<InsuranceTypes[]> =>
    useQuery({
      queryKey: ["insurance-companies"],
      queryFn: insuranceService.getInsuranceCompanies,
    }),

  useGetInsurancePayment: (): UseQueryResult<InsuranceTypes[]> =>
    useQuery({
      queryKey: ["insurance-payment"],
      queryFn: insuranceService.getInsurancePayment,
    }),

  usePostInsurancePaymentFish: (): UseMutationResult<
    InsurancePostTypes,
    AxiosError<unknown>,
    FormData
  > =>
    useMutation({
      mutationKey: ["insurance-payment"],
      mutationFn: insuranceService.postInsurancePayment,
    }),
};

export default useInsurance;
