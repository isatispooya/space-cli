import { server } from "../../../api/server";
import { ApplyNationalCodeParams, ApplyNationalCodeResponse } from "../types";
import api from "../../../api/api";

const postOtp = async ({
  nationalCode,
  captchaInput,
  encryptedResponse,
}: ApplyNationalCodeParams) => {
  const response = await api.post<ApplyNationalCodeResponse>(
    `${server}/register/otp/`,
    {
      uniqueIdentifier: nationalCode,
      captcha: captchaInput,
      encrypted_response: encryptedResponse,
    }
  );
  return response.data;
};

export default postOtp;
