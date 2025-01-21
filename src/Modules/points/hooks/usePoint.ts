import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { pointServices } from "../services";
import { MissionTypes } from "../types";

const usePoint = {
  useGetPoint: (): UseQueryResult<MissionTypes[]> => {
    return useQuery({
      queryKey: ["point"],
      queryFn: pointServices.getPoint,
    });
  },
};

export default usePoint;
