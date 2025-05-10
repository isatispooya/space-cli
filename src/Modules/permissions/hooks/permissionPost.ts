import { useMutation } from "@tanstack/react-query";
import { CreatePermissionDataType } from "../types";
import {  permissionService } from "../services";

export const useCreatePermission = () => {
  return useMutation({
    mutationKey: ["create-permission"],
    mutationFn: (data: CreatePermissionDataType) => permissionService.createPermission(data),
  });
};
    