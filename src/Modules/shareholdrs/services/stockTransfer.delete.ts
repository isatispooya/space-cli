import { api } from "../../../api";

const deleteStockTransfer = async (id: number) => {
  return await api.delete(`/stock_affairs/stock_transfer/${id}`);
};

export default deleteStockTransfer;
