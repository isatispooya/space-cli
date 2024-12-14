import Forms from "../../../components/forms";
import { usePostPrecendence } from "../hooks";
import * as Yup from "yup";

interface FormField {
  name: string;
  label: string;
  type: string;
}

const CreatePrecendenceForm = () => {
  const { mutate: postPrecendence } = usePostPrecendence();

  const formFields: FormField[] = [
    { name: "company", label: "شرکت", type: "text" },
    { name: "position", label: "موقعیت", type: "text" },
    { name: "precedence", label: "حق تقدم", type: "text" },
    { name: "used_precedence", label: "حق تقدم استفاده شده", type: "number" },
    { name: "updated_at", label: "تاریخ بروزرسانی", type: "date" },
    { name: "created_at", label: "تاریخ ایجاد", type: "date" },
  ];

  const initialValues = {
    company: "",
    position: "",
    precedence: "",
    used_precedence: "",
    updated_at: "",
    created_at: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("شرکت الزامی است"),
    position: Yup.string().required("موقعیت الزامی است"),
    precedence: Yup.string().required("حق تقدم الزامی است"),
    used_precedence: Yup.string().required("حق تقدم استفاده شده الزامی است"),
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
          await postPrecendence(values);
        } catch (error) {
          console.error("Error creating shareholder:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default CreatePrecendenceForm;
