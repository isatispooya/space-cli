import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import useCreateCompany from "../hooks/useCreateCompany";
import { CompanyFormValues, CompanyType, FormField } from "../types";

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
  email: Yup.string().email("فرمت ایمیل نامعتبر است").required("ایمیل الزامی است"),
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

const CreateCompanyForm = () => {
  const { mutate: createCompany } = useCreateCompany();
  const initialValues: CompanyFormValues = formFields.reduce(
    (acc, field) => ({
      ...acc,
      [field.name]: "",
    }),
    {} as CompanyFormValues
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      dir="rtl"
      className=" max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">ایجاد شرکت</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createCompany(values);
          } catch (error) {
            console.error("Error creating company:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="grid grid-cols-2 gap-4">
            {formFields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-sm font-medium text-gray-700"
                >
                  {field.label}
                </label>
                {field.type === "select" ? (
                  <Field
                    as="select"
                    name={field.name}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
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
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                )}
                {errors[field.name] && touched[field.name] && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-red-500 text-sm mt-1"
                  >
                    {errors[field.name]}
                  </motion.div>
                )}
              </div>
            ))}

            <div className="col-span-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? "در حال ارسال..." : "ایجاد شرکت"}
              </motion.button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default CreateCompanyForm;
