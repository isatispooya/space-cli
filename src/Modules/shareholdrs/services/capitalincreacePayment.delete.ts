import { api } from "../../../api";

const capitalIncreacePaymentDelete = (id: string) => {
  return api.delete(`/stock_affairs/capital_increase_payment/${id}/`);
};

export default capitalIncreacePaymentDelete;
