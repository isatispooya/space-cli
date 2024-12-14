import { api } from "../../../api";
import { StockTransferTypes } from "../types";

const postStockTransfer = async (data: StockTransferTypes) => {
  const response = await api.post("/stock_affairs/stock_transfer/", data);
  return response.data;
};

export default postStockTransfer;
