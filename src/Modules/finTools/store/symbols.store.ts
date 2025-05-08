import { create } from "zustand";
import { SymbolsStore } from "../types";

const symbolsStore = create<SymbolsStore>((set) => ({
  formValues: {
    desiredProfit: 0,
    symbol: 0,
    days: 0,
    calculationType: "",
  },
  setFormValues: (formValues: SymbolsStore["formValues"]) =>
    set({ formValues }),
  currentStep: 0,
  setCurrentStep: (currentStep: number) => set({ currentStep }),
  isFormSubmitted: false,
  setIsFormSubmitted: (isFormSubmitted: boolean) => set({ isFormSubmitted }),
  isSimple: true,
  setIsSimple: (isSimple: boolean) => set({ isSimple }),
}));

export default symbolsStore;
