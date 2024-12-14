import { useMutation } from "@tanstack/react-query";
import { postCapitalIncreasePayment } from "../services";

const usePostCapitalIncreasePayment = () => {
  return useMutation({
    mutationKey: ["postCapitalIncreasePayment"],
    mutationFn: postCapitalIncreasePayment,
  });
};

export default usePostCapitalIncreasePayment;
