import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../api/cookie";
import { useLoginStore } from "../stores/loginStore";
import postRegister from "../services/register.post";

const useRegister = () => {
  const navigate = useNavigate();
  const { setOpenOtp } = useLoginStore();

  return useMutation({
    mutationKey: ["Register"],
    mutationFn: postRegister,
    onSuccess: (data) => {
      setCookie("access_token", data.access, 1);
      setCookie("refresh_token", data.refresh, 1);
      navigate("/");
      setOpenOtp(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useRegister;
