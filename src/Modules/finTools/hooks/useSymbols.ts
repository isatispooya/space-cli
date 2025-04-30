import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { SymbolsServices } from "../services";
import { SymbolResponse } from "../types";
const useSymbols = {
  useGetSymbols: (): UseQueryResult<SymbolResponse> => {
    return useQuery({
      queryKey: ["symbols"],
      queryFn: SymbolsServices.getSymbols,
    });
  },
  useGetSymbolsById: (id: number): UseQueryResult<SymbolResponse> => {
    return useQuery({
      queryKey: ["symbols-by-id", id],
      queryFn: () => SymbolsServices.getSymbolsById(id),
    });
  },
};

export default useSymbols;
