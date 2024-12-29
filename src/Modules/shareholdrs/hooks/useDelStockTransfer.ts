import { useMutation } from "@tanstack/react-query";
import { deleteStockTransfer } from "../services";

const useDelStockTransfer = () => {
  return useMutation({
    mutationKey: ["deleteStockTransfer"],
    mutationFn: deleteStockTransfer,
  });
};

export default useDelStockTransfer;
