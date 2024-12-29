import { api } from "../../../api";

const dashboardService = {
  getShortcuts: async () => {
    const response = await api.get("/core/shortcuts/");
    return response.data;
  },
};

export default dashboardService;
