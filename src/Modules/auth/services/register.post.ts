import api from "../../../api/api";
import { server } from "../../../api/server";

const postRegister = async ({
  nationalCode,
  otpValue,
  referral,
}: {
  nationalCode: string;
  otpValue: string;
  encryptedResponse: string;
  referral: string;
}) => {
  const response = await api.post(`${server}/register/`, {
    uniqueIdentifier: nationalCode,
    otp: otpValue,
    referral,
  });
  return response.data;
};

export default postRegister;
