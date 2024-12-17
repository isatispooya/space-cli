import { useQuery } from "@tanstack/react-query";
import { getPurchacePrecendence } from "../services";

const usePurchacePrecendence = () => {
  return useQuery({
    queryKey: ["purchacePrecendence"],
    queryFn: getPurchacePrecendence,
  });
};

export default usePurchacePrecendence;
