import api from "../../../api/api";
import { LoginParams } from "../types";

export const Login = async (data: LoginParams) => {
  const response = await api.post('/token/',{data});
  return response.data;
};
