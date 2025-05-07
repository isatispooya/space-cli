import { Forms } from "@/components";
import * as Yup from "yup";
import { FormField } from "@/types";
import { useSymbols } from "../../hooks";
import { useState } from "react";

const SymbolsPricingCom = () => {
  const [formValues, setFormValues] = useState({
    desiredProfit: 0,
    symbol: 0,
    days: 0,
    calculationType: "",
  });

  const formFields: FormField[] = [
    {
      name: "days",
      type: "text" as const,
      label: "روزها",
    },
    {
      name: "symbol",
      type: "text" as const,
      label: "نماد",
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

  const initialValues = {
    desiredProfit: 0,
    symbol: 0,
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

  return (
    <>
      <div className="space-y-4">
        <Forms
          formFields={formFields}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            setFormValues({
              ...values,
              symbol: Number(String(values.symbol).trim()),
            });
            refetch();
          }}
          submitButtonText={{
            default: "ثبت",
            loading: "در حال ثبت...",
          }}
          title=" قیمت‌گذاری"
          buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
        />

        {isPending ? (
          <div className="text-center">در حال بارگذاری...</div>
        ) : SymbolsPricing ? (
          <div className="mt-4 p-4 bg-white rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-2">نتایج قیمت‌گذاری</h3>
            <pre className="whitespace-pre-wrap">
              {JSON.stringify(SymbolsPricing, null, 2)}
            </pre>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default SymbolsPricingCom;
