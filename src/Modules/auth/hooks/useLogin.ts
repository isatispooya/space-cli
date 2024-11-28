import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { LoginParams, token } from "../types";
import { setCookie } from "../../../api/cookie";
import { useNavigate } from "react-router-dom";
import postToken from "../services/token.post";

const useLogin = (): UseMutationResult<token, AxiosError, LoginParams> => {
  const navigate = useNavigate();
  return useMutation<token, AxiosError, LoginParams>({
    mutationKey: ["login"],
    mutationFn: postToken,
    onSuccess: (data) => {
      setCookie("access_token", data.access, 1);
      setCookie("refresh_token", data.refresh, 1);
      navigate("/");
    },
  });
};

export default useLogin;
