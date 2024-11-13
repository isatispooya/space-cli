import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../../api/api";
import { server } from "../../../api/server";
import { AxiosError } from "axios";
import { ResetPassParams } from "../types/forgetPass.type";

const useChangePass = (
  uuid
): UseMutationResult<
  { message: string },
  AxiosError,
  ResetPassParams,
  unknown
> => {
  return useMutation<{ message: string }, AxiosError, ResetPassParams, unknown>(
    {
      mutationKey: ["changePass"],
      mutationFn: async ({ newPass, confirmNewPass }) => {
        const response = await api.patch(`${server}/forgot-password/${uuid}`, {
          new_password: newPass,
          new_password_confirm: confirmNewPass,
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

export default useChangePass;
