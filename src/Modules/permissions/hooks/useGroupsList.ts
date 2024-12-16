import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../services";

const useGroupsList = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: getGroups,
  });
};

export default useGroupsList;
