import { useMutation, UseMutationResult } from "@tanstack/react-query";
import api from "../../../api/api";
import { server } from "../../../api/server";
import { AxiosError } from "axios";
import { LoginParams, token } from "../types";
import { setCookie } from "../../../api/cookie";
import { useNavigate } from "react-router-dom";
const useLogin = (): UseMutationResult<token, AxiosError, LoginParams> => {
  const navigate = useNavigate();
  return useMutation<token, AxiosError, LoginParams>({
    mutationKey: ["login"],
    mutationFn: async ({ nationalCode, password }) => {
      const response = await api.post<token>(`${server}/token/`, {
        username: nationalCode,
        password: password,
      });
      return response.data;
    },
    onSuccess: (data: token) => {
      setCookie("refresh", data.refresh, 1);

      navigate("/dashboard");
      return data;
    },
    onError: (error) => {
      return error;
    },
  });
};

export default useLogin;
