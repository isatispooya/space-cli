import Forms from "../../../components/forms";
import {  usePostStockTransfer } from "../hooks";
import * as Yup from "yup";

interface FormField {
  name: string;
  label: string;
  type: string;
}

const CreateStocktransferForm = () => {
  const { mutate: postStocktransfer } = usePostStockTransfer();

  const formFields: FormField[] = [
    { name: "buyer", label: "خریدار", type: "number" },
    { name: "seller", label: "فروشنده", type: "number" },
    { name: "number_of_shares", label: "تعداد سهام", type: "number" },
    { name: "price", label: "قیمت", type: "number" },
    { name: "updated_at", label: "تاریخ بروزرسانی", type: "date" },
    { name: "created_at", label: "تاریخ ایجاد", type: "date" }
  ];

  const initialValues = {
    buyer: null,
    seller: null,
    number_of_shares: null,
    price: null,
    updated_at: "",
    created_at: "",
  };

  const validationSchema = Yup.object().shape({
    buyer: Yup.number().required("خریدار الزامی است").nullable(),
    seller: Yup.number().required("فروشنده الزامی است").nullable(),
    number_of_shares: Yup.number()
      .required("تعداد سهام الزامی است")
      .min(1, "تعداد سهام باید بزرگتر از صفر باشد")
      .nullable(),
    price: Yup.number()
      .required("قیمت الزامی است")
      .min(0, "قیمت نمیتواند منفی باشد")
      .nullable(),
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
          await postStocktransfer(values);
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
