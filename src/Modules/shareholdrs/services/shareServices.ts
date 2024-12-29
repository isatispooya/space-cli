import { api } from "../../../api";
import { ShareholdersTypes } from "../types";

const shareServices = {
  get: async () => {
    const response = await api.get("/stock_affairs/shareholders/");
    return response.data;
  },

  create: async (data: ShareholdersTypes) => {
    const response = await api.post("/stock_affairs/shareholders/", data);
    return response.data;
  },

  update: async (id: string, data: ShareholdersTypes) => {
    const response = await api.patch(`/stock_affairs/shareholders/${id}/`, data);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/stock_affairs/shareholders/${id}/`);
    return response.data;
  },
};

export default shareServices;
