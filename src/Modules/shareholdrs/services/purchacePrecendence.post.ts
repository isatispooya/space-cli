import { api } from "../../../api";
import { purchacePrecendenceTypes } from "../types";

const postPurchacePrecendence = async (data: purchacePrecendenceTypes) => {
  const response = await api.post("/stock_affairs/create_unused_purchase/", data);
  return response.data;
};

export default postPurchacePrecendence;
