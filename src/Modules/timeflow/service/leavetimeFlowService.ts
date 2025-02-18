import { api } from "../../../api";
import { LeaveTimeFlowType } from "../types/LeaveTimeFlow.type";

const leaveTimeFlowService = () => {
  return {
    get: async () => {
      const response = await api.get("/timeflow/user-leave-log/");
      return response.data;
    },
    create: async (data: LeaveTimeFlowType) => {
      const response = await api.post(`/timeflow/user-leave-log/`, data);
      return response.data;
    },
    update: async (id: string, data: LeaveTimeFlowType) => {
      const response = await api.patch(`/timeflow/user-login-log-senior/${id}/`, data);
      return response.data;
    },
  };
};

export default leaveTimeFlowService;
