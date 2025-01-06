import { useQuery } from "@tanstack/react-query";
import { UseQueryResult } from "@tanstack/react-query";
import getTimeFlow from "../service/timeflowService";
import { TimeFlowTypes } from "../types/timeflow.type";
  
  const useTimeFlow  = {
    useGet: (): UseQueryResult<TimeFlowTypes[]> =>
      useQuery({
        queryKey: ["timeflow"],
        queryFn: getTimeFlow.get,
      }),

  };
  
  export default useTimeFlow;
  