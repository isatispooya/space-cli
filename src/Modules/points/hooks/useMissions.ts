import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { missionServices } from "../services";
import { MissionTypes } from "../types";

const useMissions = {
  useGetMissions: (): UseQueryResult<MissionTypes[]> => {
    return useQuery({
      queryKey: ["missions"],
      queryFn: missionServices.getMissions,
    });
  },
};

export default useMissions;
