import { api } from "../../../api";

const getStockTransfer = async () => {
  const response = await api.get("/stock_affairs/stock_transfer/");
  return response.data;
};

export default getStockTransfer;
