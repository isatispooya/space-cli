import { api } from "../../../api";
import { BoursTypes, CrowdTypes, ShortcutsTypes, StatsTypes } from "../types";

const dashboardService = {
  getShortcuts: async (): Promise<ShortcutsTypes[]> => {
    const response = await api.get("/core/shortcuts/");
    return response.data;
  },
  getStats: async (): Promise<StatsTypes> => {
    const response = await api.get("/marketing/stats/");
    return response.data;
  },
  getCrowd: async (): Promise<CrowdTypes> => {
    const response = await api.get("/marketing/crwod-dashboard/");
    return response.data;
  },
  getBours: async (): Promise<BoursTypes> => {
    const response = await api.get("/marketing/bours-dashboard/");
    return response.data;
  },
  getPishkar: async () => {
    const response = await api.get("/marketing/pishkar-dashboard/");
    return response.data;
  },
};

export default dashboardService;
