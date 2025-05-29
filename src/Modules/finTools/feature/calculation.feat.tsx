import { Calculator, CalculationResult } from "../components";
import { Stepper } from "@/components";
import { useState } from "react";
import { SymbolsType } from "../types";

interface CalculationFeatPropsType {
  data: Array<{
    symbol: number;
    symbol_detail: {
      id: number;
      symbol: string;
      name: string;
    };
    created_at: string;
    updated_at: string;
    description: string;
    id: number;
  }>;
}

const CalculationFeat = ({ data }: CalculationFeatPropsType) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [calculationResult, setCalculationResult] = useState<
    SymbolsType["symbolCalculatorRes"] | null
  >(null);

  const steps = [
    {
      title: "محاسبه گر",
      description: "اطلاعات سرمایه گذاری خود را وارد کنید",
      status: "default" as const,
    },
    {
      title: "نتیجه محاسبات",
      description: "مشاهده نتایج محاسبات سرمایه گذاری",
      status: "default" as const,
      isLocked: !calculationResult, 
    },
  ];

  const handleCalculationSuccess = (
    result: SymbolsType["symbolCalculatorRes"]
  ) => {
    setCalculationResult(result);
    setCurrentStep(1);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="mt-8 max-w-2xl mx-auto">
            <Calculator
              data={data}
              onCalculationSuccess={handleCalculationSuccess}
            />
          </div>
        );
      case 1:
        return (
          <div className="mt-8 max-w-2xl mx-auto">
            {calculationResult && (
              <CalculationResult result={calculationResult} />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 space-y-8">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={(step) => {
          if (step === 0 || (step === 1 && calculationResult)) {
            setCurrentStep(step);
          }
        }}
        size="medium"
        orientation="horizontal"
        showStepNumbers={true}
        allowSkip={false}
        className="max-w-2xl mx-auto"
      />

      {renderStepContent()}
    </div>
  );
};

export default CalculationFeat;
