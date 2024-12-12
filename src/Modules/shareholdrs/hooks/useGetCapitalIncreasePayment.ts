import { useQuery } from "@tanstack/react-query";
import { getCapitalIncreasePayment } from "../services";

const useGetCapitalIncreasePayment = () => {
  return useQuery({
    queryKey: ["capital-increase-payment"],
    queryFn: getCapitalIncreasePayment,
  });
};
export default useGetCapitalIncreasePayment;
