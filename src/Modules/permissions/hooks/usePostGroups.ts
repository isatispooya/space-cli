import { useMutation } from "@tanstack/react-query";

import { createPermissionGroup } from "../services";
import { CreatePermissionData } from "../types";

const usePostGroups = () => {
  return useMutation({
    mutationKey: ["createPermissionGroup"],
    mutationFn: (data: CreatePermissionData) => createPermissionGroup(data),
  });
};

export default usePostGroups;
