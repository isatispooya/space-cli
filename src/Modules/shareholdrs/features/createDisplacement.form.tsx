import Forms from "../../../components/forms";
import { usePostDisplacementPrecendence } from "../hooks";
import * as Yup from "yup";

interface FormField {
  name: string;
  label: string;
  type: string;
}

const CreateDisplacementForm = () => {
  const { mutate: postDisplacement } = usePostDisplacementPrecendence();

  const formFields: FormField[] = [
    { name: "buyer", label: "خریدار", type: "number" },
    { name: "seller", label: "فروشنده", type: "number" },
    { name: "company", label: "شرکت", type: "number" },
    { name: "number_of_shares", label: "تعداد سهام", type: "number" },
    { name: "price", label: "قیمت", type: "number" },
  ];

  const initialValues = {
    buyer: null,
    seller: null,
    company: null,
    number_of_shares: null,
    price: null,
  };

  const validationSchema = Yup.object().shape({
    buyer: Yup.number().required("خریدار الزامی است").nullable(),
    seller: Yup.number().required("فروشنده الزامی است").nullable(),
    company: Yup.number().required("شرکت الزامی است").nullable(),
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
      title="ثبت حق تقدم"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت حق تقدم",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await postDisplacement(values);
        } catch (error) {
          console.error("Error creating shareholder:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default CreateDisplacementForm;
