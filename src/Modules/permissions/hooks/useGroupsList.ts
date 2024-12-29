import { useQuery } from "@tanstack/react-query";
import {  groupsService } from "../services";

const useGroupsList = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: groupsService.getList,
  });
};

export default useGroupsList;
