import { Button, Forms } from "@/components";
import * as Yup from "yup";
import { FormFieldType } from "@/types";
import { useSymbols } from "../../../hooks";
import { Stepper } from "@/components";
import PricingTable from "./pricing.table";
import { symbolsStore } from "../../../store";
import { useParams } from "react-router-dom";

const SymbolsPricingCom = () => {
  const {
    formValues,
    setFormValues,
    currentStep,
    setCurrentStep,
    isFormSubmitted,
    setIsFormSubmitted,
  } = symbolsStore();

  const { id } = useParams();
  const { data: symbols } = useSymbols.useGetSymbolsById(Number(id));
  const symbolCode = symbols?.[0]?.symbol;

  const formFields: FormFieldType[] = [
    {
      name: "days",
      type: "text" as const,
      label: "روزها",
    },
    {
      name: "desiredProfit",
      type: "text" as const,
      label: "سود مورد انتظار",
    },
    {
      name: "calculationType",
      type: "select" as const,
      label: "نوع محاسبه",
      options: [
        { label: "مرکب", value: "compound" },
        { label: "ساده", value: "simple" },
      ],
    },
  ];

  const validationSchema = Yup.object().shape({
    desiredProfit: Yup.number().required("لطفا سود مورد انتظار را وارد کنید"),
    symbol: Yup.number().required("لطفا نماد را وارد کنید"),
    days: Yup.number().required("لطفا تعداد روزها را وارد کنید"),
    calculationType: Yup.string().required("لطفا نوع محاسبه را وارد کنید"),
  });

  console.log(symbolCode);
  const initialValues = {
    desiredProfit: 0,
    symbol: symbolCode,
    days: 0,
    calculationType: "",
  };

  const {
    data: SymbolsPricing,
    isPending,
    refetch,
  } = useSymbols.useGetSymbolsPricing(
    Number(formValues.desiredProfit),
    Number(String(formValues.symbol).trim()),
    Number(formValues.days),
    formValues.calculationType
  );

  const steps = [
    {
      title: "اطلاعات اولیه",
      description: "لطفا اطلاعات مورد نیاز برای قیمت‌گذاری را وارد کنید",
      validationFn: async () => {
        return true;
      },
    },
    {
      title: "نتایج قیمت‌گذاری",
      description: "مشاهده نتایج محاسبات قیمت‌گذاری",
      isLocked: !isFormSubmitted,
    },
  ];

  const renderStepContent = (stepIndex: number) => {
    switch (stepIndex) {
      case 0:
        return (
          <div className="mt-8">
            <Forms
              formFields={formFields}
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                setFormValues({
                  ...values,
                  symbol: Number(String(values.symbol).trim()),
                });
                await refetch();
                setIsFormSubmitted(true);
                setCurrentStep(1);
              }}
              submitButtonText={{
                default: "ادامه",
                loading: "در حال ثبت...",
              }}
              title="قیمت‌گذاری"
              colors="text-[#29D2C7]"
              buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
            />
          </div>
        );
      case 1:
        return (
          <div className="mt-8 space-y-4">
            {isPending ? (
              <div className="text-center">در حال بارگذاری...</div>
            ) : SymbolsPricing ? (
              <div className="p-4 bg-white rounded-lg shadow">
                <PricingTable pricing={SymbolsPricing} />
              </div>
            ) : null}
            <div className="flex justify-end mt-4">
              <Button
                onClick={() => {
                  setCurrentStep(0);
                  setIsFormSubmitted(false);
                }}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#29D2C7]"
              >
                بازگشت
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        orientation="horizontal"
        size="small"
        stepSpacing="normal"
        contentAlignment="center"
        showStepNumbers={true}
        allowSkip={false}
        disableAnimation={false}
      />
      {renderStepContent(currentStep)}
    </div>
  );
};

export default SymbolsPricingCom;
