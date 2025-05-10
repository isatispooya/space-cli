import api from "../../../api/api";
import { server } from "../../../api/server";
import { LoginParamsType } from "../types/loginParams.type";
import { TokenType } from "../types/token.type";


const postToken = async (params: LoginParamsType) => {
  const response = await api.post<TokenType>(`${server}/token/`, {
    username: params.nationalCode,
    password: params.password,
  });
  return response.data;
};

export default postToken;
