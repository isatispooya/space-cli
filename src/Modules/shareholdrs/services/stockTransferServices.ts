import { api } from "../../../api";

import { stockTransferTypes } from "../types";

const stockTransferServices = {
  get: async () => {
    const response = await api.get("/stock_affairs/stock_transfer/");
    return response.data;
  },
  create: async (data: stockTransferTypes) => {
    const response = await api.post("/stock_affairs/stock_transfer/", data);
    return response.data;
  },
  update: async (id: string, data: stockTransferTypes) => {
    const response = await api.patch(
      `/stock_affairs/stock_transfer/${id}/`,
      data
    );
    return response.data;
  },
  delete: async (id: string) => {
    const response = await api.delete(`/stock_affairs/stock_transfer/${id}/`);
    return response.data;
  },
};

export default stockTransferServices;
