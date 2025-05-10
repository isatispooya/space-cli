import { useMutation } from "@tanstack/react-query";

import {  groupsService } from "../services";
import { CreatePermissionDataType } from "../types";

const usePostGroups = () => {
  return useMutation({
    mutationKey: ["createPermissionGroup"],
    mutationFn: (data: CreatePermissionDataType) => groupsService.create(data),
  });
};

export default usePostGroups;
