export interface SymbolsStoreeType {
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
}

export type SymbolsStoreType = SymbolsStoreeType;
