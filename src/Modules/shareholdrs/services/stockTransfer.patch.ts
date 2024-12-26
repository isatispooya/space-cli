import { api } from "../../../api";
import { StockTransferTypes } from "../types";

const stockTransferPatch = async (id: number, data: StockTransferTypes) => {
  const response = await api.patch(`/stock_affairs/stock_transfer/${id}/`, data);
  return response.data;
};

export default stockTransferPatch;
