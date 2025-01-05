import { api } from "../../../api";

const dashboardService = {
  getShortcuts: async () => {
    const response = await api.get("/core/shortcuts/");
    return response.data;
  },
  getStats: async () => {
    const response = await api.get("/marketing/stats/");
    return response.data;
  },
};

export default dashboardService;
