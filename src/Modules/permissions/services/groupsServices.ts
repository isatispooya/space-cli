import { api } from "../../../api";
import { CreatePermissionDataType } from "../types";

const groupsService = {
  getList: async () => {
    const response = await api.get("/groups/");
    return response.data;
  },

  create: async (data: CreatePermissionDataType) => {
    const response = await api.post("/groups/", data);
    return response.data;
  },
};

export default groupsService;
