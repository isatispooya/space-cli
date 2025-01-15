import { useQuery } from "@tanstack/react-query";
import { missionServices } from "../services";

const useMissions = () => {
  return useQuery({
    queryKey: ["missions"],
    queryFn: missionServices.getMissions,
  });
};

export default useMissions;
