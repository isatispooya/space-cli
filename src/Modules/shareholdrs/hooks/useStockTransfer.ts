import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import stockTransferServices from "../services/stockTransferServices";
import { StockTransferType } from "../types/stockTransfer.type";

const useStockTransfer = {
  useGet: (): UseQueryResult<StockTransferType[]> => {
    return useQuery({
      queryKey: ["stockTransfer"],
      queryFn: stockTransferServices.get,
    });
  },

  useCreate: (): UseMutationResult<
    StockTransferType,
    Error,
    StockTransferType
  > => {
    return useMutation({
      mutationKey: ["createStockTransfer"],
      mutationFn: (data: StockTransferType) =>
        stockTransferServices.create(data),
    });
  },

  useUpdate: (): UseMutationResult<
    StockTransferType,
    Error,
    { id: string; data: StockTransferType }
  > => {
    return useMutation({
      mutationKey: ["updateStockTransfer"],
      mutationFn: ({ id, data }) => stockTransferServices.update(id, data),
    });
  },

  useDelete: (): UseMutationResult<void, Error, string> => {
    return useMutation({
      mutationKey: ["deleteStockTransfer"],
      mutationFn: (id: string) => stockTransferServices.delete(id),
    });
  },
};

export default useStockTransfer;
