import * as Yup from "yup";
import { CompanyData } from "../types/companyData.type";

import { useCompany } from "../hooks";
import Forms from "../../../components/forms";
import toast from "react-hot-toast";
import { FormField } from "../types";

interface CompanyTypeOption {
  value: string;
  label: string;
}

const validationSchema = Yup.object().shape({
  id: Yup.number().required(),
  name: Yup.string().required("نام شرکت الزامی است"),
  company_type: Yup.string().required("نوع شرکت الزامی است"),
  year_of_establishment: Yup.number().required("سال تاسیس الزامی است"),
  phone: Yup.string().required("تلفن الزامی است"),
  postal_code: Yup.string().required("کد پستی الزامی است"),
  national_id: Yup.string().required("کد شناسه الزامی است"),
  description: Yup.string(),
  registered_capital: Yup.number().required("سرمایه ثبتی الزامی است"),
  registration_number: Yup.number().required("تعداد سرمایه ثبتی الزامی است"),
  type_of_activity: Yup.string().required("نوع فعالیت الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
  website: Yup.string().url("آدرس وبسایت نامعتبر است"),
  email: Yup.string()
    .email("فرمت ایمیل نامعتبر است")
    .required("ایمیل الزامی است"),
  employees: Yup.number()
    .min(1, "تعداد کارمندان باید بیشتر از 0 باشد")
    .required("تعداد کارمندان الزامی است"),
  logo: Yup.string(),
  letterhead: Yup.string(),
  seal: Yup.string(),
  signature: Yup.string(),
  file: Yup.mixed(),
});

const COMPANY_TYPES: CompanyTypeOption[] = [
  { value: "private_joint_stock", label: "سهامی خاص" },
  { value: "public_joint_stock", label: "سهامی عام" },
  { value: "limited_liability", label: "مسئولیت محدود" },
  { value: "general_partnership", label: "تضامنی" },
  { value: "non_stock_mixed", label: "مختلط غیر سهامی" },
  { value: "stock_mixed", label: "مختلط سهامی" },
  { value: "proportional_liability", label: "نسبی" },
  { value: "cooperative", label: "تعاونی" },
] as const;

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

interface EditCompanyFormProps {
  data: CompanyData | null;
  onClose: () => void;
}

const EditCompanyForm = ({ data, onClose }: EditCompanyFormProps) => {
  const { mutate: updateCompany } = useCompany.useUpdate();
  if (!data) return null;

  const initialValues: CompanyData = {
    id: data.id,
    name: data.name || "",
    company_type: data.company_type || "",
    year_of_establishment: Number(data.year_of_establishment) || 0,
    phone: data.phone || "",
    postal_code: data.postal_code || "",
    national_id: data.national_id || "",
    description: data.description || "",
    registered_capital: Number(data.registered_capital) || 0,
    registration_number: Number(data.registration_number) || 0,
    type_of_activity: data.type_of_activity || "",
    website: data.website || "",
    email: data.email || "",
    address: data.address || "",
    employees: Number(data.employees) || 0,
  };

  return (
    <>
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema as Yup.ObjectSchema<CompanyData>}
        showCloseButton={true}
        onClose={onClose}
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        title="ویرایش شرکت"
        submitButtonText={{
          default: "ذخیره تغییرات",
          loading: "در حال ارسال...",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateCompany(
              {
                id: values.id,
                data: values,
              },
              {
                onSuccess: () => {
                  toast.success("شرکت با موفقیت ویرایش شد");
                },
                onError: () => {
                  toast.error("خطایی نامشخص رخ داده است");
                },
              }
            );
          } catch (error) {
            console.error("Error updating company:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </>
  );
};

export default EditCompanyForm;
