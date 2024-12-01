import { useQuery } from "@tanstack/react-query";
import { getPositions } from "../services";

const usePositionData = () => {
  return useQuery({
    queryKey: ["positions.get"],
    queryFn: getPositions,
  });
};

export default usePositionData;
