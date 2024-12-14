import { api } from "../../../api";
import { StockTransferTypes } from "../types";

const stockTransferPatch = async (id: number, data: StockTransferTypes) => {
  const response = await api.patch(`/shareholdrs/stock-transfer/${id}`, data);
  return response.data;
};

export default stockTransferPatch;
