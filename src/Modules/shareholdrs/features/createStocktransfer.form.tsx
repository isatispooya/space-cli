import Forms from "../../../components/forms";
import { usePostStockTransfer } from "../hooks";
import * as Yup from "yup";
import { FormField } from "../../companies/types";
import { usePositionData } from "../../positions/hooks";

const CreateStocktransferForm = () => {
  const { mutate: postStocktransfer } = usePostStockTransfer();
  const { data: positions } = usePositionData();
  const formFields: FormField[] = [
    { name: "number_of_shares", label: "تعداد سهام", type: "text" as const },
    { name: "price", label: "قیمت", type: "text" as const },
    {
      name: "buyer",
      label: "خریدار",
      type: "select" as const,
      options:
        positions?.map((position: { id: number; name: string }) => ({
          label: position.name,
          value: position.id.toString(),
        })) || [],
    },
    {
      name: "seller",
      label: "فروشنده",
      type: "select" as const,
      options:
        positions?.map((position: { id: number; name: string }) => ({
          label: position.name,
          value: position.id.toString(),
        })) || [],
    },
  ];
  const initialValues = {
    buyer: 0,
    seller: 0,
    number_of_shares: 0,
    price: 0,
    id: 0,
    document: null as string | null,
    company: 0,
    user: 0,
  };
  const validationSchema = Yup.object().shape({
    id: Yup.number().required(),
    buyer: Yup.number().required("خریدار الزامی است"),
    seller: Yup.number().required("فروشنده الزامی است"),
    number_of_shares: Yup.number()
      .required("تعداد سهام الزامی است")
      .min(1, "تعداد سهام باید بزرگتر از صفر باشد"),
    price: Yup.number()
      .required("قیمت الزامی است")
      .min(0, "قیمت نمیتواند منفی باشد"),
    document: Yup.string()
      .transform((value) => value || null)
      .nullable(),
    company: Yup.number().required(),
    user: Yup.number().required(),
  });
  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ثبت انتقال سهام"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت انتقال سهام",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const submitData = {
            ...values,
            document: values.document || null,
          };
          await postStocktransfer(submitData);
        } catch (error) {
          console.error("Error creating shareholder:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default CreateStocktransferForm;
