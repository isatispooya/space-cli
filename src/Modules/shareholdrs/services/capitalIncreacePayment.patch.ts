import { api } from "../../../api";
import { CapitalIncreasePaymentTypes } from "../types";

const capitalIncreacePaymentPatch = (data: CapitalIncreasePaymentTypes, id: number) => {
  return api.patch(`/stock_affairs/capital_increase_payment/${id}/`, data);
};

export default capitalIncreacePaymentPatch;
