import { useMutation } from "@tanstack/react-query";
import { permissionService } from "../services";
import { CreatePermissionDataType } from "../types/permissionData";

interface UpdatePermissionParamsType {
  id: number;
  data: CreatePermissionDataType;
}

const useSetPermission = () => {
  return useMutation({
    mutationKey: ["setPermission"],
    mutationFn: ({ id, data }: UpdatePermissionParamsType) =>
      permissionService.updateUserPermission(id, data),
  });
};

export default useSetPermission;
