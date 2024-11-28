import api from "../../../api/api";
import { server } from "../../../api/server";

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

export default postRegister;
