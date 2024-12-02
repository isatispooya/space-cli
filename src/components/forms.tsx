import { Formik, Form, Field, FieldProps, FormikValues } from "formik";
import { motion } from "framer-motion";
import SelectInput from "./selectInput";
import FormInput from "./formInput";
import { FormField } from "../Modules/companies/types";
import { FormikHelpers } from "formik";
import { AnyObject, Maybe, ObjectSchema } from "yup";
import { RiCloseLargeLine } from "react-icons/ri";

interface FormsProps<T extends Maybe<AnyObject>> {
  formFields: FormField[];
  initialValues: T;
  validationSchema: ObjectSchema<T>;
  onSubmit: (values: T, actions: FormikHelpers<T>) => void;
  submitButtonText: {
    default: string;
    loading: string;
  };
  title: string;
  colors?: string;
  buttonColors?: string;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const Forms = <T extends FormikValues>({
  formFields,
  initialValues,
  validationSchema,
  title,
  onSubmit,
  colors,
  submitButtonText,
  buttonColors,
  onClose,
  showCloseButton = true,
}: FormsProps<T>) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ errors, touched, isSubmitting }) => (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        dir="rtl"
        className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className={`text-2xl font-bold ${colors}`}>{title}</h2>
          {showCloseButton && onClose && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              type="button"
              className="p-2 hover:bg-gray-100 rounded-full focus:outline-none"
            >
              <RiCloseLargeLine className={`${colors} text-2xl`} />
            </motion.button>
          )}
        </div>
        <Form className="grid grid-cols-2 gap-4">
          {formFields.map((field) => (
            <div key={field.name} className="col-span-2 sm:col-span-1">
              {field.type === "select" ? (
                <Field name={field.name}>
                  {({
                    field: { value },
                    form: { setFieldValue },
                  }: FieldProps) => (
                    <SelectInput
                      options={field.options || []}
                      label={field.label}
                      value={value}
                      onChange={(newValue) =>
                        setFieldValue(field.name.toString(), newValue)
                      }
                      className="h-5"
                    />
                  )}
                </Field>
              ) : (
                <Field name={field.name}>
                  {({ field: fieldProps }: FieldProps) => (
                    <FormInput
                      {...fieldProps}
                      type={field.type}
                      label={field.label}
                      className="h-12"
                    />
                  )}
                </Field>
              )}
              {errors[field.name] && touched[field.name] && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {String(errors[field.name])}
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
              className={`w-full py-3 px-4 mt-20 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${buttonColors} focus:outline-none focus:ring-2 focus:ring-offset-2  disabled:opacity-50`}
            >
              {isSubmitting
                ? submitButtonText.loading
                : submitButtonText.default}
            </motion.button>
          </div>
        </Form>
      </motion.div>
    )}
  </Formik>
);

export default Forms;
