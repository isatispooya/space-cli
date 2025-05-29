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
    SymbolsType["symbolCalculatorRes"],
    AxiosError,
    SymbolsType["symbolCalculatorReq"]
  > => {
    return useMutation({
      mutationKey: ["symbol-calculator"],
      mutationFn: (data: SymbolsType["symbolCalculatorReq"]) =>
        SymbolsServices.postSymbolCalculator(data),
    });
  },

  usePostInvestDocument: (): UseMutationResult<
    SymbolsType["investDocumentRes"],
    AxiosError,
    SymbolsType["investDocumentReq"]
  > => {
    return useMutation({
      mutationKey: ["invest-document"],
      mutationFn: (data: SymbolsType["investDocumentReq"]) =>
        SymbolsServices.postInvestDocument(data),
    });
  },
  useGetBaseReport: (
    symbol: number
  ): UseQueryResult<SymbolsType["baseReportRes"]> => {
    return useQuery({
      queryKey: ["base-report", symbol],
      queryFn: () => SymbolsServices.getBaseReport(symbol),
    });
  },
  useGetTransactionsDates: (
    symbol_id: number
  ): UseQueryResult<SymbolsType["transactionsDatesRes"]> => {
    return useQuery({
      queryKey: ["transactions-dates", symbol_id],
      queryFn: () => SymbolsServices.getTransactionsDates(symbol_id),
    });
  },
  useGetTransactions: (
    symbol_id: number,
    fromDate: number,
    toDate: number
  ): UseQueryResult<any> => {
    return useQuery({
      queryKey: ["transactions", symbol_id, fromDate, toDate],
      queryFn: () =>
        SymbolsServices.getTransactions(symbol_id, fromDate, toDate),
    });
  },
};

export default useSymbols;
