import { api } from "../api";

export interface PaymentPostType {
  amount: number;
  description: string;
  type: string;
}

const paymentPost = async (data: PaymentPostType) => {
  const response = await api.post("/payment/verify/", data);
  return response.data;
};

export default paymentPost;
