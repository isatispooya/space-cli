import { useQuery } from "@tanstack/react-query";
import { getDisplacementPrecendence } from "../services";

const useGetDisplacementPrecendence = () => {
  return useQuery({
    queryKey: ["displacement-precedence"],
    queryFn: getDisplacementPrecendence,
  });
};
export default useGetDisplacementPrecendence;
