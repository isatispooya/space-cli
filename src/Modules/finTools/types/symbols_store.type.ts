import { DateRangeType } from ".";

export interface SymbolsStoreType {
  formValues: {
    desiredProfit: number;
    symbol: number;
    days: number;
    calculationType: string;
  };
  currentStep: number;
  isFormSubmitted: boolean;
  isSimple: boolean;
  setFormValues: (formValues: SymbolsStoreType["formValues"]) => void;
  setCurrentStep: (currentStep: number) => void;
  setIsFormSubmitted: (isFormSubmitted: boolean) => void;
  setIsSimple: (isSimple: boolean) => void;
  transactionsStep: number;
  setTransactionsStep: (step: number) => void;
  calculationResult: unknown;
  setCalculationResult: (result: unknown) => void;
  dateRange: DateRangeType;
  setDateRange: (range: DateRangeType) => void;
}
