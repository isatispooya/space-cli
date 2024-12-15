import { useMutation } from "@tanstack/react-query";
import { CreatePermissionData } from "../types";
import { createPermission } from "../services";

export const useCreatePermission = () => {
  return useMutation({
    mutationKey: ["create-permission"],
    mutationFn: (data: CreatePermissionData) => createPermission(data),
  });
};
    