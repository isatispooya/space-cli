import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CaptchaDataType } from "../types";
import { getCaptcha } from "../services/captcha.get";

export const useCaptcha = (): UseQueryResult<CaptchaDataType> => {
  return useQuery<CaptchaDataType>({
    queryKey: ["captcha"],
    queryFn: getCaptcha,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export default useCaptcha;
