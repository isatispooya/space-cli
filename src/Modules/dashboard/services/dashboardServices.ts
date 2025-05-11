import { api } from "../../../api";
import { BoursType, CrowdType, ShortcutsType, StatsType } from "../types";

const dashboardService = {
  getShortcuts: async (): Promise<ShortcutsType[]> => {
    const response = await api.get("/core/shortcuts/");
    return response.data;
  },
  getStats: async (): Promise<StatsType> => {
    const response = await api.get("/core/stats/");
    return response.data;
  },
  getCrowd: async (): Promise<CrowdType> => {
    const response = await api.get("/core/crwod-dashboard/");
    return response.data;
  },
  getBours: async (): Promise<BoursType> => {
    const response = await api.get("/core/bours-dashboard/");
    return response.data;
  },
  getPishkar: async () => {
    const response = await api.get("/core/pishkar-dashboard/");
    return response.data;
  },
};

export default dashboardService;
