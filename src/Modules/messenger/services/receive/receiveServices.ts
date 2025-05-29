import { api } from "@/api";
import { ReferralReqType } from "../../types/receive/ReceiveMessage.type";

const receiveSer = {
  getReceive: async () => {
    const response = await api.get("/correspondence/correspondence/");
    return response.data;
  },
  getReceiveById: async (id: string) => {
    const response = await api.get(`/correspondence/correspondence/${id}/`);
    return response.data;
  },
  postRefferal: async (data: ReferralReqType) => {
    const response = await api.post("/correspondence/reference/", data);
    return response.data;
  },
  getReceiveWorkflow: async (id: string) => {
    const response = await api.get(`/correspondence/reference/${id}/`);
    return response.data;
  },
};

export default receiveSer;
