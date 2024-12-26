import { api } from "../../../api";
import { CreatePermissionData } from "../types";

const permissionService = {
  getList: async () => {
    const response = await api.get("/permissions/");
    return response.data;
  },

  getUserPermission: async () => {
    const response = await api.get("/permissions-for-user/");
    return response.data;
  },

  createPermission: async (data: CreatePermissionData) => {
    const response = await api.post("/user-to-group/", data);
    return response.data;
  },

  updateUserPermission: async (id: number, data: CreatePermissionData) => {
    const response = await api.post(`/set-user-permission/${id}/`, data);
    return response.data;
  },
};

export default permissionService;
