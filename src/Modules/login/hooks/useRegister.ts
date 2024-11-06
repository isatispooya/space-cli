import { useMutation } from "@tanstack/react-query";
import api from "../../../api/api";
import { server } from "../../../api/server";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../api/cookie";
import { useLoginStore } from "../store/loginStore";

const postRegister = async ({
  nationalCode,
  otpValue,
}: {
  nationalCode: string;
  otpValue: string;
}) => {
  const response = await api.post(`${server}/register/`, {
    uniqueIdentifier: nationalCode,
    otp: otpValue,
  });
  return response.data;
};

const useRegister = () => {
  const navigate = useNavigate();
  const { setOpenOtp } = useLoginStore();

  return useMutation({
    mutationKey: ["Register"],
    mutationFn: postRegister,
    onSuccess: (data) => {
      setCookie("access_token", data.access, 1);
      setCookie("refresh_token", data.refresh, 1);
      navigate("/dashboard");
      setOpenOtp(true);
    },
  });
};

export default useRegister;
