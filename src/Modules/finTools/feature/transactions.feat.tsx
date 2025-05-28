/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { TransactionsDate, TransactionsResult } from "../components";
import { Stepper } from "@/components";

const TransactionsFeat = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [calculationResult] = useState<any | null>(null);
  const steps = [
    {
      title: "تاریخ",
      description: "تاریخ معاملات",
    },
    {
      title: "نتیجه",
      description: "نتیجه معاملات",
      isLocked: !calculationResult,
    },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <TransactionsDate />;
      case 1:
        return <TransactionsResult />;
      default:
        return null;
    }
  };
  return (
    <div>
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

export default TransactionsFeat;
