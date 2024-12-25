import { api } from "../api";

export interface UnusedPurchaseType {
  uuid: string;
}

const createUnusedPurchase = async (data: UnusedPurchaseType) => {
  const response = await api.put(
    "/stock_affairs/create_unused_purchase/",
    data
  );
  return response.data;
};

export default createUnusedPurchase;



