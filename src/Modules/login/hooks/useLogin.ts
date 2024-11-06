import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../../api/api";
import { server } from "../../../api/server";
import { AxiosError } from "axios";
import { LoginParams, token } from "../types";
import { setCookie } from "../../../api/cookie";
import { useNavigate } from "react-router-dom";

const login = async (params: LoginParams) => {

  const response = await api.post<token>(`${server}/token/`, {
    username: params.nationalCode,
    password: params.password,
  });
  return response.data;
};

const useLogin = (): UseMutationResult<token, AxiosError, LoginParams> => {
  const navigate = useNavigate();
  return useMutation<token, AxiosError, LoginParams>({
    mutationKey: ["login"],
    mutationFn: login,
    onSuccess: (data) => {
      setCookie("access_token", data.access, 1);
      setCookie("refresh_token", data.refresh, 1);
      navigate("/dashboard");
    },
  });
};

export default useLogin;
