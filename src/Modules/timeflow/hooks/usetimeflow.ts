import { useQuery } from "@tanstack/react-query";
import { TimeFlowResponse } from "../types/users.timeflow.type";
import timeflowService from "../service/timeflowService";

const useTimeFlow = {
  useGet: () => {
    return useQuery<TimeFlowResponse>({
      queryKey: ["timeflow"],
      queryFn: () => timeflowService.get()
    });
  },
};

export default useTimeFlow;
  