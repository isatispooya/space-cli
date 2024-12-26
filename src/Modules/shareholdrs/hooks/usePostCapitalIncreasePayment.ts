import { useMutation } from "@tanstack/react-query";
import { postCapitalIncreasePayment } from "../services";
import {
  CapitalIncreaseTypes,
  CapitalIncreaseCreate,
} from "../types/capitalIncrease.type";

const usePostCapitalIncreasePayment = () => {
  return useMutation<CapitalIncreaseTypes, Error, CapitalIncreaseCreate>({
    mutationKey: ["capitalIncrease"],
    mutationFn: postCapitalIncreasePayment,
  });
};

export default usePostCapitalIncreasePayment;
