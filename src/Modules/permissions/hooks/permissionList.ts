import { useQuery } from "@tanstack/react-query";
import { getPermissionList } from "../services";
import { Permission } from "../types";

const usePermissionList = () => {
  return useQuery<Permission[]>({
    queryKey: ["permissionList"],
    queryFn: async () => {
      const response = await getPermissionList();
      console.log("API response:", response); // Debug log
      return response;
    },
  });
};

export default usePermissionList;
