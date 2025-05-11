import { api } from "../../../api";
import { RequestUpdateType } from "../types/requestUpdate.type";
const giftUserServices = {
  get: async () => {
    const response = await api.get("/marketing/gift-user/");
    return response.data;
  },
  update: async (id: number, data: RequestUpdateType) => {
    const response = await api.patch(`/marketing/gift-user/${id}/`, data);
    return response.data;
  },
};

export default giftUserServices;
