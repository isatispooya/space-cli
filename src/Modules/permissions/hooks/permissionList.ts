import { useQuery } from "@tanstack/react-query";
import { permissionService } from "../services";
import { PermissionData } from "../types";

const usePermissionList = () => {
  return useQuery<PermissionData[]>({
    queryKey: ["permissionList"],
    queryFn: async () => {
      const response = await permissionService.getList();
      console.log("API response:", response); // Debug log
      return response;
    },
  });
};

export default usePermissionList;
