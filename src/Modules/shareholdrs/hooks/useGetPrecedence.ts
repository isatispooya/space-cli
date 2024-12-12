import { useQuery } from "@tanstack/react-query";
import { getPrecedence } from "../services";

const useGetPrecedence = () => {
  return useQuery({
    queryKey: ["precedence"],
    queryFn: getPrecedence,
  });
};
export default useGetPrecedence;
