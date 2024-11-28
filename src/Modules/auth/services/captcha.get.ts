import api from "../../../api/api";
import { server } from "../../../api/server";
import { CaptchaData } from "../types";

export const getCaptcha = async (): Promise<CaptchaData> => {
  const response = await api.get<CaptchaData>(`${server}/captcha/`);
  return response.data;
};
