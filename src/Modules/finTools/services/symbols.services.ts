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
  getSymbolsAnalysis: async (value: string, symbol_type: string) => {
    const response = await api.get(`/stock_affairs/symbol-return/?calculate=${value}&symbol_type=${symbol_type}`);
    return response.data;
  },
  getSymbolsPricing: async (desiredProfit: number, symbol: number, days: number, calculationType: string) : Promise<SymbolsType["pricingRes"]> => {
    const response = await api.get(`/stock_affairs/symbol-profit-calculator/${desiredProfit}/${symbol}/${days}/${calculationType}/`);
    return response.data;
  },
};

export default SymbolsServices;
