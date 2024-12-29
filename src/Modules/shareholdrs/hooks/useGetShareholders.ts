import { useQuery } from "@tanstack/react-query";
import { getShareholders } from "../services";

const useGetShareholders = () => {
  return useQuery({
    queryKey: ["shareholders"],
    queryFn: getShareholders,
  });
};
export default useGetShareholders;
