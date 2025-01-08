import { useMutation, useQuery } from "@tanstack/react-query";
import dashboardServices from "../services/dashboardServices";
import crowdUUIDservice from "../services/crowdUUIDservice";

const useDashboard = {
  useGetStats: () => useQuery({ queryKey: ["stats"], queryFn: dashboardServices.getStats }),
  useGetShortcuts: () => useQuery({ queryKey: ["shortcuts"], queryFn: dashboardServices.getShortcuts }),
  useCrowdUUID: () => useMutation({ mutationFn: crowdUUIDservice.post })
};

export default useDashboard;
