import { api } from "../../../api";
import { CreatePermissionData } from "../types";

const createPermission = (data: CreatePermissionData) => {
  return api.post("/user-to-group/", data);
};

export default createPermission;
