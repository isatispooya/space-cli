import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../../api/api";
import { server } from "../../../api/server";
import { AxiosError } from "axios";
import { ApplyNationalCodeParams, ApplyNationalCodeResponse } from "../types";

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
    mutationFn: async ({ nationalCode, captchaInput, encryptedResponse }) => {
      const response = await api.post<ApplyNationalCodeResponse>(
        `${server}/register/otp/`,
        {
          uniqueIdentifier: nationalCode,
          captcha: captchaInput,
          encrypted_response: encryptedResponse,
        }
      );

      return response.data;
    },
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export default useApplyNationalCode;
