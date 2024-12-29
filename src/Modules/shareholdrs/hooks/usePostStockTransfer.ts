import { useMutation } from "@tanstack/react-query";
import { postStockTransfer } from "../services";

const usePostStockTransfer = () => {
  return useMutation({
    mutationKey: ["postStockTransfer"],
    mutationFn: postStockTransfer,
  });
};

export default usePostStockTransfer;


