import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApplyNationalCodeParams, ApplyNationalCodeResponse } from "../types";
import postOtp from "../services/otp.post";

const useApplyNationalCode = (): UseMutationResult<
  ApplyNationalCodeResponse,
  AxiosError,
  ApplyNationalCodeParams
> => {
  return useMutation<
    ApplyNationalCodeResponse,
    AxiosError,
    ApplyNationalCodeParams
  >({
    mutationKey: ["applyNationalCode"],
    mutationFn: postOtp,

  });
};

export default useApplyNationalCode;
