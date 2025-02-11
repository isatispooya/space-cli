import { CrowdPoints } from "../services";
import { useQuery} from "@tanstack/react-query";
// import { useMutation, UseMutationResult } from "@tanstack/react-query";

const useCrowdPoints = {
  useGetPlans: () => {
    return useQuery({
      queryKey: ["crowd-points-plans"],
      queryFn: () => CrowdPoints.getPlans(),
    });
  },
};

export default useCrowdPoints;
