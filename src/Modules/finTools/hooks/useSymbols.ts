import {
  useMutation,
  useQuery,
  UseQueryResult,
  UseMutationResult,
} from "@tanstack/react-query";
import { SymbolsServices } from "../services";
import { SymbolsType } from "../types";
import { AxiosError } from "axios";

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

  usePostSymbolCalculator: (): UseMutationResult<
    any,
    AxiosError,
    SymbolsType["symbolCalculatorReq"]
  > => {
    return useMutation({
      mutationKey: ["symbol-calculator"],
      mutationFn: (data: SymbolsType["symbolCalculatorReq"]) =>
        SymbolsServices.postSymbolCalculator(data),
    });
  },
};

export default useSymbols;
