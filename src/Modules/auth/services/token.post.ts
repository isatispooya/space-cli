import api from "../../../api/api";
import { server } from "../../../api/server";
import { LoginParams } from "../types/loginParams.type";
import { token } from "../types/token.type";


const postToken = async (params: LoginParams) => {
  const response = await api.post<token>(`${server}/token/`, {
    username: params.nationalCode,
    password: params.password,
  });
  return response.data;
};

export default postToken;
