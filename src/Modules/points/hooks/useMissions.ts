import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { missionServices } from "../services";
import { MissionType } from "../types/mission.type";

const useMissions = {
  useGetMissions: (): UseQueryResult<MissionType[]> => {
    return useQuery({
      queryKey: ["missions"],
      queryFn: missionServices.getMissions,
    });
  },
};

export default useMissions;
