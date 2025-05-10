import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ResetPassParamsType } from "../types/index.ts";
import postForgetPass from "../services/forget_pass.patch.ts";

const useForgetPass = (): UseMutationResult<
  { message: string },
  AxiosError,
  ResetPassParamsType,
  unknown
> => {
  return useMutation<{ message: string }, AxiosError, ResetPassParamsType, unknown>(
    {
      mutationKey: ["forgetPass"],
      mutationFn: postForgetPass,
    }
  );
};

export default useForgetPass;
