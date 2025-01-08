import api from "../../../api/api";
import { server } from "../../../api/server";

const postRegister = async ({
  nationalCode,
  otpValue,
  referal,
}: {
  nationalCode: string;
  otpValue: string;
  referal: string;
}) => {
  const response = await api.post(`${server}/register/`, {
    uniqueIdentifier: nationalCode,
    otp: otpValue,
    referal,
  });
  return response.data;
};

export default postRegister;
