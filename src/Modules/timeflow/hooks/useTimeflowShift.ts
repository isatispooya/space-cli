import { useQuery } from "@tanstack/react-query";
import timeflowShiftService from "../service/timeflowshiftService";

const useTimeflowShift = {
  useGet: () => {
    return useQuery({
      queryKey: ["timeflow-shift"],
      queryFn: () => timeflowShiftService.get(),
    });
  },
};

export default useTimeflowShift;
