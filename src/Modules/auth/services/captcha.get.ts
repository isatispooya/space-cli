import api from "../../../api/api";
import { server } from "../../../api/server";
import { CaptchaDataType } from "../types";

export const getCaptcha = async (): Promise<CaptchaDataType> => {
  const response = await api.get<CaptchaDataType>(`${server}/captcha/`);
  return response.data;
};
