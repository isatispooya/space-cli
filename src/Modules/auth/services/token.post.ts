import api from "../../../api/api";
import { server } from "../../../api/server";
import { LoginParams, token } from "../types";

const postToken = async (params: LoginParams) => {
  const response = await api.post<token>(`${server}/token/`, {
    username: params.nationalCode,
    password: params.password,
  });
  return response.data;
};

export default postToken;
