import { Forms } from "../../../components";
import * as yup from "yup";
import { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { FormField } from "../../companies/types";
import { UseEmProcess } from "../hooks";
import { EmProcessPostTypes } from "../types";


const EmploymentsProcessUpdate = () => {
  const { mutate: updateEmprocess } = UseEmProcess.useUpdate();

  const validationSchema = yup.object({
    job_title: yup.string().required("عنوان شغل الزامی است"),
    job_description: yup.string().required("شرح شغل الزامی است"),
    start_date: yup.string().required("تاریخ شروع الزامی است"),
    end_date: yup.string().required("تاریخ پایان الزامی است"),
    salary: yup.number().required("حقوق الزامی است"),
    job_location: yup.string().required("مکان شغل الزامی است"),
    position: yup.string().required("موقعیت شغلی الزامی است"),
    reason_for_termination_of_cooperation: yup
      .string()
      .required("دلایل پایان کار الزامی است"),
  });

  const formFields: FormField[] = [
    {
      name: "job_title",
      label: "عنوان شغل",
      type: "text" as const,
    },
    {
      name: "job_description",
      label: "شرح شغل",
      type: "text" as const,
    },
    {
      name: "start_date",
      label: "تاریخ شروع",
      type: "date" as const,
    },
    {
      name: "end_date",
      label: "تاریخ پایان",
      type: "date" as const,
    },
    {
      name: "salary",
      label: "حقوق",
      type: "text" as const,
    },
    {
      name: "job_location",
      label: "مکان شغل",
      type: "text" as const,
    },
    {
      name: "position",
      label: "موقعیت شغلی",
      type: "text" as const,
    },
    {
      name: "reason_for_termination_of_cooperation",
      label: "دلایل پایان کار",
      type: "text" as const,
    },
  ];

  const initialValues: EmProcessPostTypes = {
    job_title: "",
    job_description: "",
    start_date: "",
    end_date: "",
    salary: 0,
    job_location: "",
    position: "",
    reason_for_termination_of_cooperation: "",
  };

  const handleSubmit = async (
    values: EmProcessPostTypes,
    { setSubmitting, resetForm }: FormikHelpers<EmProcessPostTypes>
  ) => {
    updateEmprocess(values, {
      onSuccess: () => {
        toast.success(" فرایند با موفقیت ایجاد شد");
        resetForm();
      },
      onSettled: () => {
        setSubmitting(false);
        resetForm();
      },
      onError: () => {
        toast.error("خطایی پیش آمده است");
        setSubmitting(false);
      },
    });
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
      showCloseButton={true}
      onSubmit={handleSubmit}
      submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
      title="ثبت فرایند شغل"
    />
  );
};

export default EmploymentsProcessUpdate;
