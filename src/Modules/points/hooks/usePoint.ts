import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { pointServices } from "../services";
import { PrivilegesType } from "../types";

const usePoint = {
  useGetPoint: (): UseQueryResult<PrivilegesType[]> => {
    return useQuery({
      queryKey: ["point"],
      queryFn: pointServices.getPoint,
    });
  },
};

export default usePoint;
