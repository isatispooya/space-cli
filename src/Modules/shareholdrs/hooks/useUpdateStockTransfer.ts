import { useMutation } from "@tanstack/react-query";
import { stockTransferPatch } from "../services";
import { StockTransferTypes } from "../types";

const useUpdateStockTransfer = () => {
  return useMutation({
    mutationKey: ["update-stock-transfer"],
    mutationFn: ({ id, data }: { id: number; data: StockTransferTypes }) =>
      stockTransferPatch(id, data),
  });
};

export default useUpdateStockTransfer;
