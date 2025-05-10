import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApplyNationalCodeParamsType, ApplyNationalCodeResponseType } from "../types";
import postOtp from "../services/otp.post";

const useApplyNationalCode = (): UseMutationResult<
  ApplyNationalCodeResponseType,
  AxiosError,
  ApplyNationalCodeParamsType
> => {
  return useMutation<
    ApplyNationalCodeResponseType,
    AxiosError,
    ApplyNationalCodeParamsType
  >({
    mutationKey: ["applyNationalCode"],
    mutationFn: postOtp,

  });
};

export default useApplyNationalCode;
