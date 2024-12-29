import { useMutation } from "@tanstack/react-query";
import { permissionService } from "../services";
import { CreatePermissionData } from "../types/permissionData";

interface UpdatePermissionParams {
  id: number;
  data: CreatePermissionData;
}

const useSetPermission = () => {
  return useMutation({
    mutationKey: ["setPermission"],
    mutationFn: ({ id, data }: UpdatePermissionParams) =>
      permissionService.updateUserPermission(id, data),
  });
};

export default useSetPermission;
