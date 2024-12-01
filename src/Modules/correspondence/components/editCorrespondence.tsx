import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { useUpdateCorrespondence } from "../hooks/useUpdateCorrespondence";
import { CorrespondenceFormValues, FormField, CorrespondenceData } from "../types";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  title: Yup.string().required("عنوان مکاتبه الزامی است"),
  sender: Yup.string().required("فرستنده الزامی است"),
  receiver: Yup.string().required("گیرنده الزامی است"),
  subject: Yup.string().required("موضوع الزامی است"),
  content: Yup.string().required("متن مکاتبه الزامی است"),
  priority: Yup.string().required("اولویت الزامی است"),
  category: Yup.string().required("دسته‌بندی الزامی است"),
  reference_number: Yup.string().required("شماره مرجع الزامی است"),
});

const PRIORITIES = [
  { value: "low", label: "کم" },
  { value: "medium", label: "متوسط" },
  { value: "high", label: "زیاد" },
] as const;

const CATEGORIES = [
  { value: "administrative", label: "اداری" },
  { value: "financial", label: "مالی" },
  { value: "technical", label: "فنی" },
  { value: "general", label: "عمومی" },
] as const;

const formFields: FormField[] = [
  { name: "title", label: "عنوان مکاتبه", type: "text" },
  { name: "sender", label: "فرستنده", type: "text" },
  { name: "receiver", label: "گیرنده", type: "text" },
  { name: "subject", label: "موضوع", type: "text" },
  { name: "content", label: "متن مکاتبه", type: "textarea" },
  {
    name: "priority",
    label: "اولویت",
    type: "select",
    options: PRIORITIES,
  },
  {
    name: "category",
    label: "دسته‌بندی",
    type: "select",
    options: CATEGORIES,
  },
  { name: "reference_number", label: "شماره مرجع", type: "text" },
  { name: "attachments", label: "پیوست‌های جدید", type: "file" },
];

interface EditCorrespondenceProps {
  data: CorrespondenceData;
  onClose?: () => void;
}

const EditCorrespondence = ({ data, onClose }: EditCorrespondenceProps) => {
  const { mutate: updateCorrespondence } = useUpdateCorrespondence(data.id);

  const initialValues: CorrespondenceFormValues = {
    title: data.title,
    sender: data.sender,
    receiver: data.receiver,
    subject: data.subject,
    content: data.content,
    priority: data.priority,
    category: data.category,
    reference_number: data.reference_number,
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg"
    >
      <motion.h2
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-2xl font-bold text-gray-800 text-center mb-8"
      >
        ویرایش مکاتبه
      </motion.h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await updateCorrespondence(values);
            toast.success("مکاتبه با موفقیت ویرایش شد");
            onClose?.();
          } catch (error) {
            console.error("Error updating correspondence:", error);
            toast.error("خطا در ویرایش مکاتبه");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ errors, touched, isSubmitting, setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {formFields.map((field) => (
              <motion.div
                key={field.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className={`space-y-2 ${
                  field.type === "textarea" ? "md:col-span-2" : ""
                }`}
              >
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
                ) : field.type === "textarea" ? (
                  <Field
                    as="textarea"
                    name={field.name}
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                ) : field.type === "file" ? (
                  <div>
                    <input
                      type="file"
                      multiple
                      onChange={(event) => {
                        setFieldValue(field.name, event.currentTarget.files);
                      }}
                      className="mt-1 block w-full text-sm text-gray-500
                        file:mr-4 file:py-2 file:px-4
                        file:rounded-full file:border-0
                        file:text-sm file:font-semibold
                        file:bg-indigo-50 file:text-indigo-700
                        hover:file:bg-indigo-100"
                    />
                    {data.attachments && data.attachments.length > 0 && (
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">پیوست‌های فعلی:</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {data.attachments.map((attachment, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                            >
                              پیوست {index + 1}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Field
                    name={field.name}
                    type={field.type}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                )}

                {errors[field.name] && touched[field.name] && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm"
                  >
                    {errors[field.name]}
                  </motion.div>
                )}
              </motion.div>
            ))}

            <div className="md:col-span-2 flex justify-end space-x-4 space-x-reverse">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isSubmitting}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    <span>در حال ذخیره...</span>
                  </div>
                ) : (
                  "ذخیره تغییرات"
                )}
              </motion.button>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                انصراف
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </motion.div>
  );
};

export default EditCorrespondence; 