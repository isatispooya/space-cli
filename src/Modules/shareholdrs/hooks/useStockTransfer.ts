import {
  useQuery,
  useMutation,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import stockTransferServices from "../services/stockTransferServices";
import { stockTransferTypes } from "../types";

const useStockTransfer = {
  useGet: (): UseQueryResult<stockTransferTypes[]> => {
    return useQuery({
      queryKey: ["stockTransfer"],
      queryFn: stockTransferServices.get,
    });
  },

  useCreate: (): UseMutationResult<
    stockTransferTypes,
    Error,
    stockTransferTypes
  > => {
    return useMutation({
      mutationKey: ["createStockTransfer"],
      mutationFn: (data: stockTransferTypes) =>
        stockTransferServices.create(data),
    });
  },

  useUpdate: (): UseMutationResult<
    stockTransferTypes,
    Error,
    { id: string; data: stockTransferTypes }
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
