import { api } from "../../../api";

interface CrowdPointsDataType {
  [key: string]: unknown;
}

const CrowdPoints = {
  getPlans: async () => {
    const response = await api.get("/club/plan-crowd/");
    return response.data;
  },
  getPlanByTraceCode: async (traceCode: string) => {
    const response = await api.get(`/club/participant-crowd/${traceCode}/`);
    return response.data;
  },
  postCrowdPoints: async (data: CrowdPointsDataType, traceCode: string) => {
    const response = await api.post(
      `/club/point-refrencer-crowd/${traceCode}/`,
      data
    );
    return response.data;
  },
};

export default CrowdPoints;
