import { useQuery } from "@tanstack/react-query";
import { getStockTransfer } from "../services";

const useGetStockTransfer = () => {
  return useQuery({
    queryKey: ["stock-transfer"],
    queryFn: getStockTransfer,
  });
};
export default useGetStockTransfer;
