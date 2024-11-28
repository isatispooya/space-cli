import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { patchChangePass } from "../services/change_pass.patch";
import { ResetPassParams } from "../types/changePass.type";

const useChangePass = (): UseMutationResult<
  { message: string },
  AxiosError,
  ResetPassParams,
  unknown
> => {
  return useMutation<{ message: string }, AxiosError, ResetPassParams, unknown>(
    {
      mutationKey: ["changePass"],
      mutationFn: patchChangePass,
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
