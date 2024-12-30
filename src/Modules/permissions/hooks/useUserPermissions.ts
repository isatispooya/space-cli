import { useQuery } from "@tanstack/react-query";
import {  permissionService } from "../services";

interface Permission {
  codename: string;
  name: string;
  id: number;
}
const useUserPermissions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-permissions"],
    queryFn: permissionService.getUserPermission,
  });

  const checkPermission = (permission: string) => {
    if (isLoading || !data) {
      return false;
    }
    if (permission === "allow_any") {
      return true;
    }
    const hasPermission = data.some((item: Permission) => item.codename === permission);
    return hasPermission;
  };

  return { data, isLoading, error, checkPermission };
};

export default useUserPermissions;
