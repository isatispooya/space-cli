import { useQuery } from "@tanstack/react-query";
import { getuserPermission } from "../services";

interface Permission {
  codename: string;
  name: string;
  id: number;
}
const useUserPermissions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["user-permissions"],
    queryFn: getuserPermission,
  });

  const checkPermission = (permission: string) => {
    if (isLoading || !data) {
      return false;
    }
    return data.find((item: Permission) => item.codename === permission);
  };

  return { data, isLoading, error, checkPermission };
};

export default useUserPermissions;
