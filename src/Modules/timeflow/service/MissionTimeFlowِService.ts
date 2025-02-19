import { api } from "../../../api";
import { LeaveTimeFlowType } from "../types/LeaveTimeFlow.type";

const missionTimeFlowService = () => {
  return {
    get: async () => {
      const response = await api.get("/timeflow/user-mission-log/");
      return response.data;
    },
    create: async (data: LeaveTimeFlowType) => {
      const response = await api.post(`/timeflow/user-mission-log/`, data);
      return response.data;
    },
    update: async (id: string, data: LeaveTimeFlowType) => {
      const response = await api.patch(`/timeflow/user-mission-log/${id}/`, data);
      return response.data;
    },
  };
};

export default missionTimeFlowService;
