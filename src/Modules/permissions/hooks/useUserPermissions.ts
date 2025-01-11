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

  const checkPermission = (permission: string | string[]) => {
    if (isLoading || !data) {
      return false;
    }
    if (permission === "allow_any") {
      return true;
    }

    // تبدیل ورودی به آرایه
    const permissionsToCheck = Array.isArray(permission)
      ? permission
      : [permission];

    // بررسی اینکه آیا حداقل یکی از پرمیشن‌ها وجود دارد
    const hasPermission = permissionsToCheck.some((perm) =>
      data.some((item: Permission) => item.codename === perm)
    );

    return hasPermission;
  };

  return { data, isLoading, error, checkPermission };
};

export default useUserPermissions;
