
import { TransactionsDate, TransactionsResult } from "../components";
import { Stepper } from "@/components";
import { useParams } from "react-router-dom";
import { useSymbols } from "../hooks";
import symbolsStore from "../store/symbols.store";

const TransactionsFeat = () => {
  const { transactionsStep, setTransactionsStep, calculationResult } =
    symbolsStore();
  const { id } = useParams();

  const { data: symbol } = useSymbols.useGetSymbolsById(Number(id));
  const symbolID = symbol?.[0]?.symbol;
  const { data: transactionsData } = useSymbols.useGetTransactionsDates(
    Number(symbolID)
  );

  const dates = transactionsData?.dates || [];

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
    switch (transactionsStep) {
      case 0:
        return <TransactionsDate dates={dates} />;
      case 1:
        return <TransactionsResult symbolID={Number(symbolID)} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Stepper
        steps={steps}
        currentStep={transactionsStep}
        onStepClick={(step) => {
          if (step === 0 || (step === 1 && calculationResult)) {
            setTransactionsStep(step);
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
