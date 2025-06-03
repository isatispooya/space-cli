import { useQuery } from "@tanstack/react-query";
import { permissionService } from "../services";

interface PermissionType {
  codename: string;
  name: string;
  id: number;
}
const useUserPermissions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-permissions"],
    queryFn: permissionService.getUserPermission,
  });

  const checkPermission = (permission: string[]) => {
    if (isLoading || !data) {
      return false;
    }

    const permissionArray = Array.isArray(permission)
      ? permission
      : [permission];

    if (permissionArray.includes("allow_any")) {
      return true;
    }

    const hasPermission = permissionArray.some((perm) =>
      data.some((item: PermissionType) => item.codename === perm)
    );

    return hasPermission;
  };

  return { data, isLoading, error, checkPermission };
};

export default useUserPermissions;
