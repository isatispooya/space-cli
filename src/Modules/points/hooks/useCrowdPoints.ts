import { CrowdPoints } from "../services";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { PlanByTraceCodeType, PlansCoinsPostType, PlansType } from "../types";
import { AxiosError } from "axios";

const useCrowdPoints = {
  useGetPlans: (): UseQueryResult<PlansType> => {
    return useQuery({
      queryKey: ["crowd-points-plans"],
      queryFn: () => CrowdPoints.getPlans(),
    });
  },
  useGetPlanByTraceCode: (
    traceCode: string
  ): UseQueryResult<PlanByTraceCodeType> => {
    return useQuery({
      queryKey: ["crowd-points-plan-by-trace-code"],
      queryFn: () => CrowdPoints.getPlanByTraceCode(traceCode),
    });
  },
  usePostCrowdPoints: (
    traceCode: string
  ): UseMutationResult<PlansCoinsPostType, AxiosError<unknown>, PlansCoinsPostType> => {
    return useMutation({
      mutationKey: ["post-crowd-points"],
      mutationFn: (data: PlansCoinsPostType) =>
        CrowdPoints.postCrowdPoints(data, traceCode),
    });
  },
};

export default useCrowdPoints;
