import { api } from "@/api";
import { SymbolResponse } from "../types";

const SymbolsServices = {
  getSymbols: async () => {
    const response = await api.get<SymbolResponse>(
      "/stock_affairs/introduce-symbol/"
    );
    return response.data;
  },
  getSymbolsById: async (id: number) => {
    const response = await api.get<SymbolResponse>(
      `/stock_affairs/introduce-symbol/${id}/`
    );
    return response.data;
  },
};

export default SymbolsServices;
