import { api } from "../../../api";

const getCapitalIncreasePayment = async () => {
  const response = await api.get("/stock_affairs/capital_increase_payment/");
  return response.data;
};

export default getCapitalIncreasePayment;
