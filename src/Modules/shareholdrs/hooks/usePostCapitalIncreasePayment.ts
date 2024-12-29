import { useMutation } from "@tanstack/react-query";
import { postCapitalIncreasePayment } from "../services";
import { CapitalIncreaseTypes } from "../types/capitalIncreasePayment.type";
import { CapitalIncreaseCreate } from "../types/capitalIncrease.type";

const usePostCapitalIncreasePayment = () => {
  return useMutation<CapitalIncreaseTypes, Error, CapitalIncreaseCreate>({
    mutationKey: ["capitalIncrease"],
    mutationFn: (data: CapitalIncreaseCreate) =>
      postCapitalIncreasePayment(data),
  });
};

export default usePostCapitalIncreasePayment;
