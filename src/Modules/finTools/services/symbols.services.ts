import { api } from "@/api";
import { SymbolsType } from "../types";

const SymbolsServices = {
  getSymbols: async (): Promise<SymbolsType["symbolRes"]> => {
    const response = await api.get("/stock_affairs/introduce-symbol/");
    return response.data;
  },
  getSymbolsById: async (id: number): Promise<SymbolsType["symbolRes"]> => {
    const response = await api.get(`/stock_affairs/introduce-symbol/${id}/`);
    return response.data;
  },
  getSymbolsAnalysis: async () => {
    const response = await api.get(`/stock_affairs/symbol-return/`);
    return response.data;
  },
};

export default SymbolsServices;
