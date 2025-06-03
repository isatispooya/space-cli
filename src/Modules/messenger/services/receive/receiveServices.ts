import { api } from "@/api";
import { ReferralReqType } from "../../types/receive/ReceiveMessage.type";
import { ArchiveReqType } from "../../types/receive/archive";

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
  postArchive: async (data: ArchiveReqType) => {
    const response = await api.post(
      `/correspondence/archive/correspondence/`,
      data

    );
    
    return response.data;
  },
  deleteArchive: async (id: string) => {
    const response = await api.delete(
      `/correspondence/archive/correspondence/${id}/`
    );
    return response.data;
  },
};

export default receiveSer;
