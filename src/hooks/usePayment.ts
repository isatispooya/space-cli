import { paymentPost } from "../services";
import createUnusedPurchase from "../services/stockAffairs.put";
import { useMutation } from "@tanstack/react-query";
import { PaymentPostType } from "../services/payment.post";

export const usePayment = () => {
  const payment = useMutation({
    mutationKey: ["payment"],
    mutationFn: (data: PaymentPostType) => paymentPost(data),
  });

  const unusedPurchase = useMutation({
    mutationKey: ["unusedPurchase"],
    mutationFn: createUnusedPurchase,
  });

  return {
    payment,
    unusedPurchase,
  };
};
