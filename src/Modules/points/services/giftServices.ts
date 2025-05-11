import { api } from "../../../api";
import { GiftsPostType } from "../types/giftsPost.type";


const giftServices = {
  getGifts: async () => {
    const response = await api.get("/marketing/gift/");
    return response.data;
  },
  postGift: async (data: GiftsPostType) => {
    const response = await api.post("/marketing/gift-user/", data);
    return response.data;
  },
};

export default giftServices;
