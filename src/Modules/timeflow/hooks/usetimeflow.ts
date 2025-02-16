import { useQuery } from "@tanstack/react-query";
import { usersTimeflowType } from "../types/users.timeflow.type";
import timeflowService from "../service/timeflowService";

const useTimeFlow = {
  useGet: () => {
    return useQuery<usersTimeflowType>({
      queryKey: ["timeflow"],
      queryFn: () => timeflowService.get()
    });
  },
};

export default useTimeFlow;
  