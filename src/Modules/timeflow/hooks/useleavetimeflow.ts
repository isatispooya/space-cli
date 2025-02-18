import { useQuery } from "@tanstack/react-query";
import leaveTimeFlowService from "../service/leavetimeFlowService";

const useLeaveTimeFlow = () => {
  return useQuery({
    queryKey: ["leaveTimeFlow"],
    queryFn: leaveTimeFlowService().get,
  });
};
export default useLeaveTimeFlow;
