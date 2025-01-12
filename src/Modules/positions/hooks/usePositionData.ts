import { useQuery } from "@tanstack/react-query";
import { getPositions } from "../services";
import { PositionData } from "../types";

export const usePositionData = () => {
  const { data: positions, refetch, isPending } = useQuery<PositionData[]>({
    queryKey: ["positions.get"],
    queryFn: getPositions,
  });

  return { data: positions, refetch, isPending };
};

export default usePositionData;
