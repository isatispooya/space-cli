import { api } from "../../../api";

const giftUserServices = {
  get: async () => {
    const response = await api.get("/marketing/gift-user/");
    return response.data;
  },
};

export default giftUserServices;
