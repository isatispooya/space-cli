import Forms from "../../../components/forms";
import { CompanyTypes } from "../types";
import { FormField } from "../types";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FormikHelpers } from "formik";
import { useCompany } from "../hooks";
import * as Yup from "yup";

const COMPANY_TYPES = [
  { value: "private_joint_stock", label: "سهامی خاص" },
  { value: "public_joint_stock", label: "سهامی عام" },
  { value: "limited_liability", label: "مسئولیت محدود" },
  { value: "general_partnership", label: "تضامنی" },
  { value: "non_stock_mixed", label: "مختلط غیر سهامی" },
  { value: "stock_mixed", label: "مختلط سهامی" },
  { value: "proportional_liability", label: "نسبی" },
  { value: "cooperative", label: "تعاونی" },
];

const formFields: FormField[] = [
  { name: "name", label: "نام شرکت", type: "text" },
  {
    name: "company_type",
    label: "نوع شرکت",
    type: "select",
    options: COMPANY_TYPES,
  },
  { name: "address", label: "آدرس", type: "text" },
  { name: "year_of_establishment", label: "سال تاسیس", type: "text" },
  { name: "phone", label: "تلفن", type: "text" },
  { name: "postal_code", label: "کد پستی", type: "text" },
  { name: "national_id", label: "کد شناسه", type: "text" },
  { name: "description", label: "توضیحات", type: "text" },
  { name: "registered_capital", label: "سرمایه ثبتی", type: "text" },
  { name: "registration_number", label: "تعداد سرمایه ثبتی", type: "text" },
  { name: "type_of_activity", label: "نوع فعالیت", type: "text" },
  { name: "website", label: "وبسایت", type: "text" },
  { name: "email", label: "ایمیل", type: "email" },
  { name: "logo", label: "لوگو", type: "file" },
  { name: "letterhead", label: "سربرگ", type: "file" },
  { name: "signature", label: "امضا", type: "file" },
  { name: "seal", label: "مهر", type: "file" },
];

const validationSchema = Yup.object().shape({
  id: Yup.number(),
  employees: Yup.number(),
  file: Yup.mixed(),
  name: Yup.string().required("نام شرکت الزامی است"),
  company_type: Yup.string().required("نوع شرکت الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
  year_of_establishment: Yup.number()
    .transform((value) => Number(value) || undefined)
    .required("سال تاسیس الزامی است"),
  phone: Yup.string().required("تلفن الزامی است"),
  postal_code: Yup.string().required("کد پستی الزامی است"),
  national_id: Yup.string().required("کد شناسه الزامی است"),
  description: Yup.string(),
  registered_capital: Yup.number()
    .transform((value) => Number(value) || undefined)
    .required("سرمایه ثبتی الزامی است"),
  registration_number: Yup.number()
    .transform((value) => Number(value) || undefined)
    .required("تعداد سرمایه ثبتی الزامی است"),
  type_of_activity: Yup.string().required("نوع فعالیت الزامی است"),
  website: Yup.string().url("وبسایت باید یک URL معتبر باشد"),
  email: Yup.string()
    .email("ایمیل باید معتبر باشد")
    .required("ایمیل الزامی است"),
  logo: Yup.mixed().required("لوگو الزامی است"),
  letterhead: Yup.mixed().required("سربرگ الزامی است"),
  signature: Yup.mixed().required("امضا الزامی است"),
  seal: Yup.mixed().required("مهر الزامی است"),
});

const CreateCompanyForm = () => {
  const { mutate: createCompany } = useCompany.useCreate();
  const navigate = useNavigate();
  const initialValues: CompanyData = formFields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: "",
    }),
    {} as CompanyData
  );

  const handleSubmit = async (
    values: CompanyData,
    { setSubmitting }: FormikHelpers<CompanyData>
  ) => {
    const formData = new FormData();

    Object.keys(values).forEach((key) => {
      const value = values[key as keyof CompanyData];
      if (
        key === "logo" ||
        key === "letterhead" ||
        key === "signature" ||
        key === "seal"
      ) {
        const fileInput = document.querySelector(
          `input[name="${key}"]`
        ) as HTMLInputElement;
        const file = fileInput?.files?.[0];
        if (file) formData.append(key, file);
      } else if (value) {
        formData.append(key, String(value));
      }
    });

    createCompany(formData, {
      onSuccess: () => {
        toast.success("شرکت با موفقیت ایجاد شد");
        navigate("/companies/table");
      },
      onSettled: () => {
        setSubmitting(false);
      },
    });
  };

  return (
    <Forms<CompanyData>
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema as Yup.ObjectSchema<CompanyData>}
      title="ثبت اطلاعات شرکت"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ایجاد شرکت",
        loading: "در حال ارسال...",
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default CreateCompanyForm;
