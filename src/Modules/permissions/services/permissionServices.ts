import { api } from "../../../api";
import { CreatePermissionDataType } from "../types";

const permissionService = {
  getList: async () => {
    const response = await api.get("/permissions/");
    return response.data;
  },

  getUserPermission: async () => {
    const response = await api.get("/permissions-for-user/");
    return response.data;
  },

  createPermission: async (data: CreatePermissionDataType) => {
    const response = await api.post("/user-to-group/", data);
    return response.data;
  },

  updateUserPermission: async (id: number, data: CreatePermissionDataType) => {
    const response = await api.post(`/set-user-permission/${id}/`, data);
    return response.data;
  },
};

export default permissionService;
