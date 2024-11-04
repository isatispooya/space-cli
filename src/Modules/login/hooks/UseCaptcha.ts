import { useQuery, UseQueryResult } from "@tanstack/react-query";
import api from "../../../api/api";
import { server } from "../../../api/server";
import { CaptchaData } from "../types/captchaData";

const getCaptcha = async (): Promise<CaptchaData> => {
  const response = await api.get<CaptchaData>(`${server}/captcha/`);
  return response.data;
};

export const useCaptcha = (): UseQueryResult<CaptchaData> => {
  return useQuery<CaptchaData>({
    queryKey: ["captcha"],
    queryFn: getCaptcha,
    staleTime: 5 * 60 * 1000,
    retry: 3,
  });
};

export default useCaptcha;
