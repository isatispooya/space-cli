import { api } from "../../../api";
import { CapitalIncreaseTypes } from "../types";

const postCapitalIncreasePayment = async (
  data: CapitalIncreaseTypes
) => {
  const response = await api.post(
    "/stock_affairs/capital_increase_payment/",
    data
  );
  return response.data;
};

export default postCapitalIncreasePayment;
