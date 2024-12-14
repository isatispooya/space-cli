import { api } from "../../../api";
import { CapitalIncreasePaymentTypes } from "../types";

const postCapitalIncreasePayment = async (
  data: CapitalIncreasePaymentTypes
) => {
  const response = await api.post(
    "/stock_affairs/capital_increase_payment/",
    data
  );
  return response.data;
};

export default postCapitalIncreasePayment;
