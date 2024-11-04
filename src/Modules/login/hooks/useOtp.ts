import { useMutation, UseMutationResult } from "@tanstack/react-query";

import api from "../../../api/api";
import { server } from "../../../api/server";

interface ApplyNationalCodeParams {
  nationalCode: string;
  captchaInput: string;
  encryptedResponse: string;
}

interface ApplyNationalCodeResponse {
  message: string;
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
      error?: string;
    };
  };
  message: string;
}

const useApplyNationalCode = (): UseMutationResult<
  ApplyNationalCodeResponse,
  ApiError,
  ApplyNationalCodeParams
> => {
  return useMutation<
    ApplyNationalCodeResponse,
    ApiError,
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
      if (error.response?.data?.error) {
        console.error("خطا بدون پاسخ:", error.response?.data?.error);
      } else if (error.response?.data?.message) {
        console.error("خطا بدون پاسخ:", error.response?.data?.message);
      } else {
        console.error("خطا بدون پاسخ:", error.message);
      }
    },
  });
};

export default useApplyNationalCode;
