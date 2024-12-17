import { api } from "../../../api";
import { purchacePrecendenceTypes } from "../types";

const postPurchacePrecendence = async (data: purchacePrecendenceTypes) => {
  const response = await api.post("/stock_affairs/unused_precedence_purchase/", data);
  return response.data;
};

export default postPurchacePrecendence;
