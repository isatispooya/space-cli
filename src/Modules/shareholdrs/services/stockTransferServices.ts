import { api } from "../../../api";

import { StockTransferType } from "../types/stockTransfer.type";

const stockTransferServices = {
  get: async () => {
    const response = await api.get("/stock_affairs/stock_transfer/");
    return response.data;
  },
  create: async (data: StockTransferType) => {
    const response = await api.post("/stock_affairs/stock_transfer/", data);
    return response.data;
  },
  update: async (id: string, data: StockTransferType) => {
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
