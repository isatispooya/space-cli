import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../../api/api";
import { server } from "../../../api/server";
import { AxiosError } from "axios";
import { ResetPassParams } from "../types";

const useResetPass = (): UseMutationResult<
  { message: string },
  AxiosError,
  ResetPassParams,
  unknown
> => {
  return useMutation<{ message: string }, AxiosError, ResetPassParams, unknown>(
    {
      mutationKey: ["forgetPass"],
      mutationFn: async ({ nationalCode }) => {
        const response = await api.post(`${server}/forgot-password/`, {
          uniqueIdentifier: nationalCode,
        });

        return response.data;
      },
      onSuccess: (data) => {
        return data;
      },
      onError: (error) => {
        return error;
      },
    }
  );
};

export default useResetPass;
