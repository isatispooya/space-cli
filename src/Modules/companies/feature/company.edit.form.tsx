import * as Yup from "yup";
import { CompanyTypes } from "../types";

import { useCompany } from "../hooks";
import Forms from "../../../components/form/forms";
import toast from "react-hot-toast";
import { FormField } from "../../../types";
import { useParams } from "react-router-dom";

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
  { name: "title", label: "عنوان", type: "text" },
  { name: "persian_registration_date", label: "تاریخ ثبت", type: "text" },
  { name: "tel", label: "تلفن ثابت", type: "text" },
  { name: "capital", label: "سرمایه", type: "text" },
  { name: "registration_type_title", label: "عنوان نوع ثبت", type: "text" },
  { name: "registration_unit", label: "واحد ثبتی", type: "text" },
  { name: "general_directorate", label: "اداره کل", type: "text" },
  { name: "total_shares", label: "تعداد سهام", type: "text" },
];

const EditCompanyForm = () => {
  const { mutate: updateCompany } = useCompany.useUpdate();
  const { data } = useCompany.useGet();
  const { id } = useParams();

  const specificCompany = data?.find((company) => company.id === Number(id));

  const initialValues: CompanyTypes = {
    id: specificCompany?.id || 0,
    name: specificCompany?.name || "",
    company_type: specificCompany?.company_type || "",
    year_of_establishment: Number(specificCompany?.year_of_establishment) || 0,
    phone: specificCompany?.phone || null,
    postal_code: Number(specificCompany?.postal_code) || null,
    national_id: specificCompany?.national_id || null,
    description: specificCompany?.description || "",
    registered_capital: Number(specificCompany?.registered_capital) || 0,
    registration_number: specificCompany?.registration_number || null,
    type_of_activity: specificCompany?.type_of_activity || "",
    website: specificCompany?.website || "",
    email: specificCompany?.email || "",
    address: specificCompany?.address || "",
    title: specificCompany?.title || "",
    persian_registration_date: specificCompany?.persian_registration_date || "",
    tel: specificCompany?.tel || "",
    capital: specificCompany?.capital || 0,
    registration_type_title: specificCompany?.registration_type_title || "",
    registration_unit: specificCompany?.registration_unit || "",
    general_directorate: specificCompany?.general_directorate || "",
    letterhead: specificCompany?.letterhead || "",
    logo: specificCompany?.logo || "",
    seal: specificCompany?.seal || "",
    signature: specificCompany?.signature || "",
    total_shares: specificCompany?.total_shares || 0,
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold text-center mb-4">ویرایش شرکت</h2>
      <Forms
        title="ویرایش شرکت"
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={
          validationSchema as unknown as Yup.ObjectSchema<CompanyTypes>
        }
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        submitButtonText={{
          default: "ذخیره تغییرات",
          loading: "در حال ارسال...",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateCompany(
              {
                id: values.id,
                data: {
                  ...values,
                  year_of_establishment: String(values.year_of_establishment),
                  registered_capital: String(values.registered_capital),
                  registration_number: String(values.registration_number),
                  phone: String(values.phone),
                  postal_code: String(values.postal_code),
                  national_id: String(values.national_id),
                  capital: String(values.capital),
                  total_shares: values.total_shares ? String(values.total_shares) : undefined,
                },
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
    </div>
  );
};

export default EditCompanyForm;
