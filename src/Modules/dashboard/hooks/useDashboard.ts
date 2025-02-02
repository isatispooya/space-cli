import {
  useMutation,
  useQuery,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import dashboardServices from "../services/dashboardServices";
import crowdUUIDservice from "../services/crowdUUIDservice";
import {
  BimeTypes,
  BoursTypes,
  CrowdTypes,
  ShortcutsTypes,
  StatsTypes,
} from "../types";

const useDashboard = {
  useGetStats: (): UseQueryResult<StatsTypes> =>
    useQuery({ queryKey: ["stats"], queryFn: dashboardServices.getStats }),
  useGetShortcuts: (): UseQueryResult<ShortcutsTypes[]> => {
    return useQuery({
      queryKey: ["shortcuts"],
      queryFn: dashboardServices.getShortcuts,
    });
  },
  useCrowdUUID: (): UseMutationResult<void, Error, string> => {
    return useMutation({ mutationFn: crowdUUIDservice.post });
  },
  useGetCrowd: (): UseQueryResult<CrowdTypes> => {
    return useQuery({
      queryKey: ["crowd"],
      queryFn: dashboardServices.getCrowd,
    });
  },
  useGetBours: (): UseQueryResult<BoursTypes> => {
    return useQuery({
      queryKey: ["bours"],
      queryFn: dashboardServices.getBours,
    });
  },
  useGetPishkar: (): UseQueryResult<BimeTypes> => {
    return useQuery({
      queryKey: ["pishkar"],
      queryFn: dashboardServices.getPishkar,
    });
  },
};

export default useDashboard;
