import { api } from "../../../api";
import { GiftsPost } from "../types";

const giftServices = {
  getGifts: async () => {
    const response = await api.get("/marketing/gift/");
    return response.data;
  },
  postGift: async (data: GiftsPost) => {
    const response = await api.post("/marketing/gift-user/", data);
    return response.data;
  },
};

export default giftServices;
