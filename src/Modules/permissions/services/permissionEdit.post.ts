import { api } from "../../../api";

export interface EditPermissionData {
  user_id: number;
  permission_id: number;
}

const editPermission = async (data: EditPermissionData) => {
  return await api.post("/set-user-permission/", data);
};

export default editPermission;
