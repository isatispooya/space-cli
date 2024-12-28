import { api } from "../../../api";
import { CapitalIncreaseTypes } from "../types/capitalIncreasePayment.type";
import { CapitalIncreaseCreate } from "../types/capitalIncrease.type";

const postCapitalIncreasePayment = async (
  data: CapitalIncreaseCreate
): Promise<CapitalIncreaseTypes> => {
  const response = await api.post(
    "/stock_affairs/capital_increase_payment/",
    data
  );
  return response.data;
};

export default postCapitalIncreasePayment;
