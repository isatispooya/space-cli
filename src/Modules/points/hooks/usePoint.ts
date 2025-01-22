import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { pointServices } from "../services";
import { PrivilegesTypes } from "../types";

const usePoint = {
  useGetPoint: (): UseQueryResult<PrivilegesTypes[]> => {
    return useQuery({
      queryKey: ["point"],
      queryFn: pointServices.getPoint,
    });
  },
};

export default usePoint;
