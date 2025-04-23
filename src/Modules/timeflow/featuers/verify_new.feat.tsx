import { Forms } from "@/components";
import { FormField } from "@/types";
import * as Yup from "yup";

const NewVerifyForm = () => {
  const validationSchema = Yup.object().shape({
    time: Yup.string().required("Time is required"),
    type: Yup.string().required("Type is required"),
  });

  const formFields: FormField[] = [
    {
      name: "time",
      label: "زمان",
      type: "timePicker",
    },
    {
      name: "type",
      label: "نوع تردد",
      type: "select",
      options: [
        { value: "login", label: "ورود" },
        { value: "logout", label: "خروج" },
        { value: "absent", label: "غیبت" },
        { value: "leave", label: "مرخصی" },
        { value: "mission", label: "ماموریت" },
      ],
    },
  ];

  const initialValues = {
    time: "",
    type: "",
  };

  const onSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ثبت تردد"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
      submitButtonText={{
        default: "ثبت تردد",
        loading: "در حال ارسال...",
      }}
      onSubmit={onSubmit}
    />
  );
};

export default NewVerifyForm;
