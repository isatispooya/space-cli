import {
  useMutation,
  useQuery,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import dashboardServices from "../services/dashboardServices";
import crowdUUIDservice from "../services/crowdUUIDservice";
import {
  BimeType,
  BoursType,
  CrowdType,
  ShortcutsType,
  StatsType,
} from "../types";

const useDashboard = {
  useGetStats: (): UseQueryResult<StatsType> =>
    useQuery({ queryKey: ["stats"], queryFn: dashboardServices.getStats }),
  useGetShortcuts: (): UseQueryResult<ShortcutsType[]> => {
    return useQuery({
      queryKey: ["shortcuts"],
      queryFn: dashboardServices.getShortcuts,
    });
  },
  useCrowdUUID: (): UseMutationResult<void, Error, string> => {
    return useMutation({ mutationFn: crowdUUIDservice.post });
  },
  useGetCrowd: (): UseQueryResult<CrowdType> => {
    return useQuery({
      queryKey: ["crowd"],
      queryFn: dashboardServices.getCrowd,
    });
  },
  useGetBours: (): UseQueryResult<BoursType> => {
    return useQuery({
      queryKey: ["bours"],
      queryFn: dashboardServices.getBours,
    });
  },
  useGetPishkar: (): UseQueryResult<BimeType> => {
    return useQuery({
      queryKey: ["pishkar"],
      queryFn: dashboardServices.getPishkar,
    });
  },
};

export default useDashboard;
