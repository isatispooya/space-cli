import { api } from "../../../api";
import { MissionTimeFlowType } from "../types/missionTimeFlow.type";

const missionTimeFlowService = () => {
  return {
    get: async () => {
      const response = await api.get("/timeflow/user-mission-log/");
      return response.data;
    },
    create: async (data: MissionTimeFlowType) => {
      const response = await api.post(`/timeflow/user-mission-log/`, data);
      return response.data;
    },
    update: async (id: string, data: MissionTimeFlowType) => {
      const response = await api.patch(
        `/timeflow/user-mission-log/${id}/`,
        data
      );
      return response.data;
    },
  };
};

export default missionTimeFlowService;
