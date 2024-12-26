import { useMutation } from "@tanstack/react-query";
import { permissionService } from "../services";
import { CreatePermissionData as EditPermissionData } from "../types";

interface UpdatePermissionParams {
  id: number;
  data: EditPermissionData;
}

const useSetPermission = () => {
  return useMutation({
    mutationKey: ["setPermission"],
    mutationFn: ({ id, data }: UpdatePermissionParams) =>
      permissionService.updateUserPermission(id, data),
  });
};

export default useSetPermission;
