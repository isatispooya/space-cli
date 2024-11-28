import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { CaptchaData } from "../types";
import { getCaptcha } from "../services/captcha.get";

export const useCaptcha = (): UseQueryResult<CaptchaData> => {
  return useQuery<CaptchaData>({
    queryKey: ["captcha"],
    queryFn: getCaptcha,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export default useCaptcha;
