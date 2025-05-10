import { useQuery } from "@tanstack/react-query";
import { permissionService } from "../services";
import { PermissionDataType } from "../types";

const usePermissionList = () => {
  return useQuery<PermissionDataType[]>({
    queryKey: ["permissionList"],
    queryFn: async () => {
      const response = await permissionService.getList();
      return response;
    },
  });
};

export default usePermissionList;
