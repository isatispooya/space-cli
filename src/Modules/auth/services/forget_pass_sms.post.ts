import api from "../../../api/api";
import { server } from "../../../api/server";

const postForgetPassSms = async (nationalCode: string) => {
  const response = await api.post(`${server}/forgot-password/`, {
    uniqueIdentifier: nationalCode,
  });
  return response.data;
};

export default postForgetPassSms;
