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
  usePostFields: (): UseMutationResult<
    InsurancePostTypes,
    AxiosError<unknown>,
    InsurancePostTypes
  > =>
    useMutation({
      mutationKey: ["insurance-requests"],
      mutationFn: insuranceService.postFields,
    }),
  usePostRequest: (): UseMutationResult<
    InsuranceRequestPostTypes,
    AxiosError<unknown>,
    FormData
  > =>
    useMutation({
      mutationKey: ["insurance-requests"],
      mutationFn: insuranceService.postRequest,
    }),
};

export default useInsurance;
