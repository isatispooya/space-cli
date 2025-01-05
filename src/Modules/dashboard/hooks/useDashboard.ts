import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services";

const useDashboard = {
  useGetShortcuts: () => {
    return useQuery({
      queryKey: ["shortcuts"],
      queryFn: dashboardService.getShortcuts,
    });
  },

  useGetStats: () => {
    return useQuery({
      queryKey: ["stats"],
      queryFn: dashboardService.getStats,
      retry: 2,
    });
  },
};

export default useDashboard;
