import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../api/cookie";
import { useLoginStore } from "../stores/loginStore";
import postRegister from "../services/register.post";
import { RegisterParams } from "../types";

const useRegister = () => {
  const navigate = useNavigate();
  const { setOpenOtp } = useLoginStore();

  return useMutation<any, Error, RegisterParams>((data) => postRegister(data));
};

export default useRegister;
