import { api } from "../../../api";
import { RequestUpdateTypes } from "../types";

const giftUserServices = {
  get: async () => {
    const response = await api.get("/marketing/gift-user/");
    return response.data;
  },
  update: async (id: number, data: RequestUpdateTypes) => {
    const response = await api.patch(`/marketing/gift-user/${id}/`, data);
    return response.data;
  },
};

export default giftUserServices;
