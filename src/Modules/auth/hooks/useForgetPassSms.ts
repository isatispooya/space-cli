import { useMutation } from "@tanstack/react-query";
import postForgetPassSms from "../services/forget_pass_sms.post";

const useForgetPassSms = () => {
  return useMutation({
    mutationKey: ["forgetPassSms"],
    mutationFn: postForgetPassSms,
  });
};

export default useForgetPassSms;
