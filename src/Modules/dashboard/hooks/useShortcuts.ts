import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

const useShortcuts = () => {
  return useQuery({
    queryKey: ["shortcuts"],
    queryFn: dashboardService.getShortcuts,
  });
};

export default useShortcuts;
