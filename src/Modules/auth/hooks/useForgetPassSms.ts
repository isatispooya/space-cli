import { useMutation, UseMutationResult } from "@tanstack/react-query";
import postForgetPassSms from "../services/forget_pass_sms.post";
import { AxiosError } from "axios";

const useForgetPassSms = (): UseMutationResult<
  { message: string },
  AxiosError<unknown>,
  string
> => {
  return useMutation({
    mutationKey: ["forgetPassSms"],
    mutationFn: postForgetPassSms,
    onSuccess: (response) => {
      console.log(response);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useForgetPassSms;
