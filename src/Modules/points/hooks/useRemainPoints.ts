import { useQuery } from "@tanstack/react-query";
import { getRemainPoints } from "../services";

 const useRemainPoints = () => {
  return useQuery({
    queryKey: ["remainPoints"],
    queryFn: getRemainPoints,
  });
};
export default useRemainPoints;
