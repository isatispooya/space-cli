import { api } from "../../../api";
import { PositionPostTypes } from "../types";

const positionService = {
  getList: async () => {
    const response = await api.get("/positions/positions");
    return response.data;
  },

  update: async (id: number, data: PositionPostTypes) => {
    const response = await api.patch(`/positions/positions/${id}/`, data);
    return response.data;
  },

  delete: async (id: number) => {
    const response = await api.delete(`/positions/positions/${id}/`);
    return response.data;
  },
};

export default positionService;
