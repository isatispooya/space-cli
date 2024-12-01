import useCreatePos from "../hooks/useCreatePos";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import {  PositionFormValues } from "../types";

interface FormField {
  name: keyof PositionFormValues;
  label: string;
  type?: string;
  options?: { value: string; label: string }[];
}

const PositionCreate = () => {
  const { mutate: createPosition } = useCreatePos();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام نقش الزامی است"),
    company: Yup.string().required("شرکت الزامی است"),
    start_date: Yup.string().required("تاریخ شروع الزامی است"),
    end_date: Yup.string().required("تاریخ پایان الزامی است"),
    description: Yup.string(),
    parent: Yup.string(),
    type_of_employment: Yup.string().required("نوع استخدام الزامی است"),
  });

  const formFields: FormField[] = [
    { name: "name", label: "نام نقش", type: "text" },
    { name: "company", label: "شرکت" },
    { name: "start_date", label: "تاریخ شروع" },
    { name: "end_date", label: "تاریخ پایان" },
    { name: "created_at", label: "توضیحات" },
    { name: "description", label: "توضیحات", type: "text" },
    { name: "parent", label: "نقش پدر", type: "text" },
    { name: "type_of_employment", label: "نوع استخدام" },
  ];

  const initialValues: PositionFormValues = {
    name: "",
    company: "",
    parent: "",
    type_of_employment: "",
    description: "",
    start_date: "",
    end_date: "",
    created_at: "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      dir="rtl"
      className=" max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800">ایجاد نقش</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await createPosition(values);
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

export default PositionCreate;
