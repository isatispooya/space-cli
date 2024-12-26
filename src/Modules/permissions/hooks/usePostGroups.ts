import { useMutation } from "@tanstack/react-query";

import {  groupsService } from "../services";
import { CreatePermissionData } from "../types";

const usePostGroups = () => {
  return useMutation({
    mutationKey: ["createPermissionGroup"],
    mutationFn: (data: CreatePermissionData) => groupsService.create(data),
  });
};

export default usePostGroups;
