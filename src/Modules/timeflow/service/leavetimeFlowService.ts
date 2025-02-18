import { api } from "../../../api";

const leaveTimeFlowService = () => {
  return {
    get: async () => {
      const response = await api.get("/timeflow/user-leave-log/");
      return response.data;
    },
    getById: async (id: string) => {
      const response = await api.get(`/timeflow/user-leave-log/${id}/`);
      return response.data;
    },
  };
};

export default leaveTimeFlowService;
