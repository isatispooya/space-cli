import { create } from "zustand";
import { SymbolsStoreType } from "../types";

const symbolsStore = create<SymbolsStoreType>((set) => ({
  formValues: {
    desiredProfit: 0,
    symbol: 0,
    days: 0,
    calculationType: "",
  },
  setFormValues: (formValues: SymbolsStoreType["formValues"]) =>
    set({ formValues }),
  currentStep: 0,
  setCurrentStep: (currentStep: number) => set({ currentStep }),
  isFormSubmitted: false,
  setIsFormSubmitted: (isFormSubmitted: boolean) => set({ isFormSubmitted }),
  isSimple: true,
  setIsSimple: (isSimple: boolean) => set({ isSimple }),
  transactionsStep: 0,
  setTransactionsStep: (step: number) => set({ transactionsStep: step }),
  calculationResult: null,
  setCalculationResult: (result: unknown) => set({ calculationResult: result }),
  dateRange: {
    startId: null,
    endId: null,
  },
  setDateRange: (range: { startId: number | null; endId: number | null }) =>
    set({ dateRange: range }),
}));

export default symbolsStore;
