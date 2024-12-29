import { api } from "../../../api";
import { CreatePermissionData } from "../types";

const groupsService = {
  getList: async () => {
    const response = await api.get("/groups/");
    return response.data;
  },

  create: async (data: CreatePermissionData) => {
    const response = await api.post("/groups/", data);
    return response.data;
  },
};

export default groupsService;
