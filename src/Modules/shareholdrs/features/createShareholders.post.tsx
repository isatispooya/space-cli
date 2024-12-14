import Forms from "../../../components/forms";
import { usePostShareholders } from "../hooks";
import * as Yup from 'yup';
import {  CreateShareholderDTO } from "../types"

interface FormField {
  name: string;
  label: string;
  type: string;
}

const CreateShareholdersPost = () => {
  const { mutate: postShareholders } = usePostShareholders();

  const formFields: FormField[] = [
    { name: "name", label: "نام", type: "text" },
    { name: "number_of_shares", label: "تعداد سهام", type: "number" },
    { name: "company", label: "شرکت", type: "text" },
 
    { name: "updated_at", label: "تاریخ بروزرسانی", type: "date" },
    { name: "created_at", label: "تاریخ ایجاد", type: "date" },
  ];

  const initialValues: CreateShareholderDTO = {
    name: "",
    number_of_shares: 0,
    company: "",
    updated_at: "",
    created_at: ""
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام الزامی است"),
    number_of_shares: Yup.number()
      .required("تعداد سهام الزامی است")
      .min(1, "تعداد سهام باید بزرگتر از صفر باشد"),
    company: Yup.string().required("نام شرکت الزامی است"),
  });

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ثبت اطلاعات سهامدار"
      colors="text-[#29D2C7] "
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت سهامدار",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await postShareholders(values);
        } catch (error) {
          console.error("Error creating shareholder:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default CreateShareholdersPost;
