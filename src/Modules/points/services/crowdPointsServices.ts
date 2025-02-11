import { api } from "../../../api";

const CrowdPoints = {
  getPlans: async () => {
    const response = await api.get("/marketing/plan-crowd/");
    return response.data;
  },
};

export default CrowdPoints;
