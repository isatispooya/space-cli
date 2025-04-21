import { api } from "@/api";

const KhatamServices = {
  getSymbols: async () => {
    const response = await api.get("/stock_affairs/introduce-symbol/");
    return response.data;
  },
};

export default KhatamServices;
