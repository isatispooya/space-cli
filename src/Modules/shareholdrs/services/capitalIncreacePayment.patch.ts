import { api } from "../../../api";
import { CapitalIncreaseTypes } from "../types";

const capitalIncreacePaymentPatch = (data: CapitalIncreaseTypes, id: number) => {
  return api.patch(`/stock_affairs/capital_increase_payment/${id}/`, data);
};

export default capitalIncreacePaymentPatch;
