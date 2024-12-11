import { useQuery } from "@tanstack/react-query";
import { getPermissionList } from "../services";

const usePermissionList = () => {
  return useQuery({
    queryKey: ["permissionList"],
    queryFn: getPermissionList,
  });
};

export default usePermissionList;
