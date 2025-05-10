import { server } from "../../../api/server";
import { ApplyNationalCodeParamsType, ApplyNationalCodeResponseType } from "../types";
import api from "../../../api/api";

const postOtp = async ({
  nationalCode,
  captchaInput,
  encryptedResponse,
  referral,
}: ApplyNationalCodeParamsType) => {
  const response = await api.post<ApplyNationalCodeResponseType>(
    `${server}/register/otp/`,
    {
      uniqueIdentifier: nationalCode,
      captcha: captchaInput,
      encrypted_response: encryptedResponse,
      referral,
    }
  );
  
  return response.data;
};

export default postOtp;
