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
  useGetSymbolsAnalysis: (): UseQueryResult<SymbolsType["symbolAnalysisRes"]> => {
    return useQuery({
      queryKey: ["symbols-analysis"],
      queryFn: () => SymbolsServices.getSymbolsAnalysis(),
    });
  },
};

export default useSymbols;
