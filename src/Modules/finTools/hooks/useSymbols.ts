import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SymbolsServices } from "../services";
import { SymbolsType } from "../types";

const useSymbols = {
  useGetSymbols: (): UseQueryResult<SymbolsType["symbolRes"]> => {
    return useQuery({
      queryKey: ["symbols"],
      queryFn: SymbolsServices.getSymbols,
    });
  },
  useGetSymbolsById: (id: number): UseQueryResult<SymbolsType["symbolRes"]> => {
    return useQuery({
      queryKey: ["symbols-by-id", id],
      queryFn: () => SymbolsServices.getSymbolsById(id),
    });
  },
  useGetSymbolsAnalysis: (
    value: string,
    symbol_type: string
  ): UseQueryResult<SymbolsType["symbolAnalysisRes"]> => {
    return useQuery({
      queryKey: ["symbols-analysis", value, symbol_type],
      queryFn: () => SymbolsServices.getSymbolsAnalysis(value, symbol_type),
    });
  },

  useGetSymbolsPricing: (
    desiredProfit: number,
    symbol: number,
    days: number,
    calculationType: string
  ): UseQueryResult<SymbolsType["pricingRes"]> => {
    return useQuery({
      queryKey: [
        "symbols-pricing",
        desiredProfit,
        symbol,
        days,
        calculationType,
      ],
      queryFn: () =>
        SymbolsServices.getSymbolsPricing(
          desiredProfit,
          symbol,
          days,
          calculationType
        ),
    });
  },
};

export default useSymbols;
