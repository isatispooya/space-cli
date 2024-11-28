import api from "../../../api/api";
import { server } from "../../../api/server";
import { ResetPassParams } from "../types";

const postForgetPass = async ({
  smsCode,
  newPass,
  confirmNewPass,
}: ResetPassParams) => {
  const response = await api.patch(`${server}/forgot-password/`, {
    code: smsCode,
    new_password: newPass,
    new_password_confirm: confirmNewPass,
  });
  
  return response.data;
};
export default postForgetPass;
