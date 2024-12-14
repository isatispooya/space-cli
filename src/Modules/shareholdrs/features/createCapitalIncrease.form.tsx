import Forms from "../../../components/forms";
import { usePostCapitalIncreasePayment} from "../hooks";
import * as Yup from "yup";

interface FormField {
  name: string;
  label: string;
  type: string;
}

const CreateCapitalIncreaseForm = () => {
  const { mutate: postCapitalIncrease } = usePostCapitalIncreasePayment();

  const formFields: FormField[] = [
    { name: "company", label: "شرکت", type: "number" },
    { name: "position", label: "موقعیت", type: "number" },
    { name: "number_of_shares", label: "تعداد سهام", type: "number" },
    { name: "price", label: "قیمت", type: "number" },
    { name: "updated_at", label: "تاریخ بروزرسانی", type: "date" },
    { name: "created_at", label: "تاریخ ایجاد", type: "date" }
  ];

  const initialValues = {
    company: null,
    position: null,
    number_of_shares: null,
    price: null,
    updated_at: "",
    created_at: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.number().required("شرکت الزامی است").nullable(),
    position: Yup.number().required("موقعیت الزامی است").nullable(),
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
          await postCapitalIncrease(values);
        } catch (error) {
          console.error("Error creating shareholder:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default CreateCapitalIncreaseForm;
