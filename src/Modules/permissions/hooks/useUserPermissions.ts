import { useQuery } from "@tanstack/react-query";
import { permissionService } from "../services";

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

  const checkPermission = (permission: string[]) => {
    if (isLoading || !data) {
      return false;
    }

    // اطمینان از آرایه بودن
    const permissionArray = Array.isArray(permission)
      ? permission
      : [permission];

    if (permissionArray.includes("allow_any")) {
      return true;
    }

    const hasPermission = permissionArray.some((perm) =>
      data.some((item: Permission) => item.codename === perm)
    );

    return hasPermission;
  };

  return { data, isLoading, error, checkPermission };
};

export default useUserPermissions;
