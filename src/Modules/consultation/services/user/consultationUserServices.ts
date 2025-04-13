import { api } from "@/api";
import { ConsultationUserType } from "../../types";

const userServices = {
  getSubjects: async () => {
    const response = await api.get("/consulting/consultants/");
    return response.data;
  },
  postSubject: async (data: { consultant_id: number }) => {
    const response = await api.post(`/consulting/reserve-turn-user/`, data);
    return response.data;
  },
  getRequests: async (): Promise<ConsultationUserType["RequestsType"]> => {
    const response = await api.get(`/consulting/reserve-turn-user/`);
    return response.data;
  },
};

export default userServices;
