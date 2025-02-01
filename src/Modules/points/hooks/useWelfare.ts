import { useQuery } from "@tanstack/react-query";
import { getWelfare } from "../services";

const useWelfare = () => {
  return useQuery({
    queryKey: ["Welfare"],
    queryFn: getWelfare,
  });
};
export default useWelfare;
