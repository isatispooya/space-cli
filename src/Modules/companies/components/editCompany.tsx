import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {
  CompanyFormValues,
  CompanyType,
  FormField,
  CompanyData,
} from "../types";
import useUpdateCompany from "../hooks/useUpdateCompany";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("نام شرکت الزامی است"),
  company_type: Yup.string().required("نوع شرکت الزامی است"),
  year_of_establishment: Yup.string().required("سال تاسیس الزامی است"),
  phone: Yup.string().required("تلفن الزامی است"),
  postal_code: Yup.string().required("کد پستی الزامی است"),
  national_id: Yup.string().required("کد شناسه الزامی است"),
  description: Yup.string(),
  registered_capital: Yup.string().required("سرمایه ثبتی الزامی است"),
  registration_number: Yup.string().required("تعداد سرمایه ثبتی الزامی است"),
  type_of_activity: Yup.string().required("نوع فعالیت الزامی است"),
  address: Yup.string().required("آدرس الزامی است"),
  website: Yup.string().url("آدرس وبسایت نامعتبر است"),
  email: Yup.string()
    .email("فرمت ایمیل نامعتبر است")
    .required("ایمیل الزامی است"),
  employees: Yup.number()
    .min(1, "تعداد کارمندان باید بیشتر از 0 باشد")
    .required("تعداد کارمندان الزامی است"),
});

const COMPANY_TYPES: readonly CompanyType[] = [
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
  { name: "phone", label: "تلفن", type: "tel" },
  { name: "postal_code", label: "کد پستی", type: "text" },
  { name: "national_id", label: "کد شناسه", type: "text" },
  { name: "description", label: "توضیحات", type: "text" },
  { name: "registered_capital", label: "سرمایه ثبتی", type: "text" },
  { name: "registration_number", label: "تعداد سرمایه ثبتی", type: "text" },

  { name: "type_of_activity", label: "نوع فعالیت", type: "text" },
  { name: "website", label: "وبسایت", type: "url" },
  { name: "email", label: "ایمیل", type: "email" },
  { name: "employees", label: "تعداد کارمندان", type: "number" },
];

interface EditCompanyFormProps {
  data: CompanyData | null;
}

const EditCompanyForm = ({ data }: EditCompanyFormProps) => {
  const { mutate: updateCompany } = useUpdateCompany(data?.id as number);
  if (!data) return null;

  const initialValues: CompanyFormValues = {
    id: data.id,
    name: data.name || '',
    company_type: data.company_type || '',
    year_of_establishment: data.year_of_establishment?.toString() || '',
    phone: data.phone || '',
    postal_code: data.postal_code || '',
    national_id: data.national_id || '',
    description: data.description || '',
    registered_capital: data.registered_capital?.toString() || '',
    registration_number: data.registration_number || '',
    type_of_activity: data.type_of_activity || '',
    website: data.website || '',
    email: data.email || '',
    address: data.address || '',
    employees: data.employees || 0,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      dir="rtl"
      className="max-w-7xl mx-auto mt-10 p-10 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] backdrop-blur-sm"
    >
      <motion.h2
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 text-center"
      >
        ویرایش شرکت
      </motion.h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateCompany({ id: data.id, ...values });
          } catch (error) {
            console.error("Error updating company:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {formFields.map((field) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="group space-y-2 bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <label
                  htmlFor={field.name}
                  className="block text-sm font-bold text-gray-700 group-hover:text-indigo-600 transition-colors duration-200"
                >
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <Field
                    as="select"
                    name={field.name}
                    className="mt-1 block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300 hover:border-indigo-300"
                  >
                    <option value="">انتخاب کنید</option>
                    {field.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Field>
                ) : (
                  <Field
                    name={field.name}
                    type={field.type}
                    className="mt-1 block w-full rounded-xl border-2 border-gray-200 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition-all duration-300 hover:border-indigo-300"
                  />
                )}
                {errors[field.name] && touched[field.name] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 font-medium bg-red-50 p-2 rounded-lg"
                  >
                    {errors[field.name]}
                  </motion.div>
                )}
              </motion.div>
            ))}

            <div className="col-span-full mt-8">
              <motion.button
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-8 border border-transparent rounded-xl text-lg font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-all duration-300 shadow-lg"
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center space-x-2 space-x-reverse">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>در حال ارسال...</span>
                  </div>
                ) : (
                  "ذخیره تغییرات"
                )}
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditCompanyForm;
