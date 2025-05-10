import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { insuranceService } from "../services";
import { AxiosError } from "axios";
import {
  InsurancePostType,
  InsuranceRequestPostType,
  InsuranceType,
  InsuranceUpdateType,
} from "../types";
import { InsurancePaymentDarghahType } from "../types/dargah.type";

const useInsurance = {
  useGetFields: (): UseQueryResult<InsuranceType[]> =>
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
    InsurancePostType,
    AxiosError<unknown>,
    InsurancePostType
  > =>
    useMutation({
      mutationKey: ["insurance-requests"],
      mutationFn: insuranceService.postFields,
    }),

  usePostRequest: (
    id?: string
  ): UseMutationResult<
    InsuranceRequestPostType,
    AxiosError<unknown>,
    FormData
  > =>
    useMutation({
      mutationKey: ["insurance-requests", id],
      mutationFn: (data: FormData) => insuranceService.postRequest(data),
    }),

  useUpdateRequest: (
    id?: string
  ): UseMutationResult<InsuranceUpdateType, AxiosError<unknown>, FormData> =>
    useMutation({
      mutationKey: ["insurance-requests", id],
      mutationFn: (data: FormData) =>
        insuranceService.updateRequest(data, id ? Number(id) : 0),
    }),

  useDeleteRequest: (
    id: number
  ): UseMutationResult<void, AxiosError<unknown>, number, unknown> =>
    useMutation({
      mutationKey: ["insurance-requests", id],
      mutationFn: (id: number) => insuranceService.deleteRequest(id),
    }),

  useGetInsuranceCompanies: (): UseQueryResult<InsuranceType[]> =>
    useQuery({
      queryKey: ["insurance-companies"],
      queryFn: insuranceService.getInsuranceCompanies,
    }),

  useGetInsurancePayment: (): UseQueryResult<InsuranceType[]> =>
    useQuery({
      queryKey: ["insurance-payment"],
      queryFn: insuranceService.getInsurancePayment,
    }),

  usePostInsurancePaymentFish: (): UseMutationResult<
    InsurancePostType,
    AxiosError<unknown>,
    FormData
  > =>
    useMutation({
      mutationKey: ["insurance-payment"],
      mutationFn: insuranceService.postInsurancePayment,
    }),

  usePostInsurancePaymentDarghah: (): UseMutationResult<
    InsurancePostType,
    AxiosError<unknown>,
    InsurancePaymentDarghahType
  > =>
    useMutation({
      mutationKey: ["insurance-payment"],
      mutationFn: (data: InsurancePaymentDarghahType) =>
        insuranceService.postInsurancePaymnetDarghah(data),
    }),
};

export default useInsurance;
