import * as Yup from "yup";
import Forms from "../../../components/forms";
import useCreateCompany from "../hooks/useCreateCompany";
import { CompanyData } from "../types/companyData.type";
import { FormField } from "../types";

const validationSchema = Yup.object().shape({
  id: Yup.number().required(),
  name: Yup.string().required("نام شرکت الزامی است"),
  company_type: Yup.string().required("نوع شرکت الزامی است"),
  year_of_establishment: Yup.number().required("سال تاسیس الزامی است"),
  phone: Yup.string().required("تلفن الزامی است"),
  postal_code: Yup.string().required("کد پستی الزامی است"),
  national_id: Yup.string().required("کد شناسه الزامی است"),
  description: Yup.string(),
  registered_capital: Yup.number().optional(),
  registration_number: Yup.number().required("تعداد سرمایه ثبتی الزامی است"),
  type_of_activity: Yup.string().required("نوع فعالیت الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
  website: Yup.string().url("آدرس وبسایت نامعتبر است"),
  email: Yup.string()
    .email("فرمت ایمیل نامعتبر است")
    .matches(
      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      "فرمت ایمیل نامعتبر است (مثال: example@gmail.com)"
    )
    .required("ایمیل الزامی است"),
  employees: Yup.number()
    .min(1, "تعداد کارمندان باید بیشتر از 0 باشد")
    .required("تعداد کارمندان الزامی است"),
  logo: Yup.string().optional(),
  letterhead: Yup.string().optional(),
  seal: Yup.string().optional(),
  signature: Yup.string().optional(),
});

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
  { name: "employees", label: "تعداد کارمندان", type: "text" },
];

const CreateCompanyForm = () => {
  const { mutate: createCompany } = useCreateCompany();
  const initialValues: CompanyData = formFields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: "",
    }),
    {} as CompanyData
  );

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ثبت اطلاعات شرکت"
      colors="text-[#29D2C7] "
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ایجاد شرکت",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await createCompany(values);
        } catch (error) {
          console.error("Error creating company:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default CreateCompanyForm;
