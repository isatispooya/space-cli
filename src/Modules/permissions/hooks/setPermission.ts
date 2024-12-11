import { useMutation } from "@tanstack/react-query";
import { editPermission } from "../services";
import { EditPermissionData } from "../services/permissionEdit.post";

const useSetPermission = () => {
  return useMutation({
    mutationKey: ["setPermission"],
    mutationFn: (data: EditPermissionData) => editPermission(data),
  });
};

export default useSetPermission;
