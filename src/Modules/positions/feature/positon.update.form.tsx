import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterMomentJalaali } from "@mui/x-date-pickers/AdapterMomentJalaali";
import moment from "moment-jalaali";
import { useUserData } from "../../users/hooks";
import { useCompaniesData } from "../../companies/hooks";
import { usePositionData, useUpdatePosition } from "../hooks";
import { PositionData, PositionFormValues } from "../types";

interface FormField {
  name: keyof PositionFormValues;
  label: string;
  type?: string;
  options?: { value: string; label: string }[];
}

interface PositionUpdateProps {
  data: PositionData | null;
}

interface Company {
  id: number;
  name: string;
}

interface User {
  id: number;
  first_name?: string;
  last_name?: string;
}

const PositionUpdate = ({ data }: PositionUpdateProps) => {
  const { mutate: updatePosition } = useUpdatePosition(data?.id as number);
  const { data: companies } = useCompaniesData();
  const { data: users } = useUserData();
  const { data: positions } = usePositionData();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام نقش الزامی است"),
    company: Yup.string().required("شرکت الزامی است"),
    start_date: Yup.string().required("تاریخ شروع الزامی است"),
    end_date: Yup.string().required("تاریخ پایان الزامی است"),
    description: Yup.string(),
    parent: Yup.string(),
    type_of_employment: Yup.string().required("نوع استخدام الزامی است"),

    user: Yup.number().required("کاربر الزامی است"),
  });

  const typeOfEmploymentOptions = [
    "full_time",
    "part_time",
    "contract",
    "freelance",
    "internship",
  ];

  const typeOfEmploymentTranslations: Record<string, string> = {
    full_time: "تمام وقت",
    part_time: "پاره وقت",
    contract: "قراردادی",
    freelance: "فریلنسر",
    internship: "کارآموزی",
  };

  const formFields: FormField[] = [
    { name: "name", label: "نام نقش", type: "text" },
    {
      name: "company",
      label: "شرکت",
      type: "select",
      options:
        companies?.results?.map((company: Company) => ({
          value: company.id,
          label: company.name,
        })) || [],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select",
      options:
        users?.map((user: User) => ({
          value: user.id,
          label: user.first_name || user.last_name,
        })) || [],
    },
    { name: "start_date", label: "تاریخ شروع", type: "date" },
    { name: "end_date", label: "تاریخ پایان", type: "date" },
    { name: "description", label: "توضیحات", type: "text" },
    {
      name: "parent",
      label: "نقش پدر",
      type: "select",
      options:
        positions?.results?.map((position: PositionData) => ({
          value: position.id,
          label: position.name,
        })) || [],
    },
    {
      name: "type_of_employment",
      label: "نوع استخدام",
      type: "select",
      options: typeOfEmploymentOptions.map((type) => ({
        value: type,
        label: typeOfEmploymentTranslations[type],
      })),
    },
  ];

  const initialValues: PositionFormValues = {
    name: data?.name || "",
    company: String(data?.company || companies?.results?.[0]?.id || ""),
    user: Number(data?.user || 0),
    parent: String(data?.parent || ""),
    type_of_employment: String(data?.type_of_employment || ""),
    description: data?.description || "",
    start_date: data?.start_date || "",
    end_date: data?.end_date || "",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      dir="rtl"
      className=" max-w-6xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-lg"
    >
      <LocalizationProvider dateAdapter={AdapterMomentJalaali}>
        <h2 className="text-2xl font-bold mb-6 text-gray-800">بروزرسانی نقش</h2>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          enableReinitialize={true}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updatePosition({
                id: data?.id as number,
                data: values,
              });
            } catch (error) {
              console.error("Error updating position:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            touched,
            isSubmitting,
            setFieldValue,
            values,
            setFieldTouched,
          }) => (
            <Form className="grid grid-cols-2 gap-4">
              {formFields.map((field) => (
                <div key={field.name}>
                  <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  {field.type === "date" ? (
                    <DatePicker
                      value={
                        values[field.name] ? moment(values[field.name]) : null
                      }
                      onChange={(newValue) => {
                        setFieldValue(
                          field.name,
                          newValue ? newValue.format("YYYY-MM-DD") : ""
                        );
                      }}
                      slotProps={{
                        textField: {
                          variant: "outlined",
                          error:
                            touched[field.name] && Boolean(errors[field.name]),
                          helperText: touched[field.name] && errors[field.name],
                          className: "w-full",
                          onBlur: () => {
                            setFieldTouched(field.name, true);
                          },
                        },
                      }}
                    />
                  ) : field.type === "select" ? (
                    <Field
                      as="select"
                      name={field.name}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        const value =
                          field.name === "user"
                            ? Number(e.target.value)
                            : e.target.value;
                        setFieldValue(field.name, value);
                      }}
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
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue(field.name, e.target.value);
                      }}
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
                  {isSubmitting ? "در حال ارسال..." : "ایجاد نقش"}
                </motion.button>
              </div>
            </Form>
          )}
        </Formik>
      </LocalizationProvider>
    </motion.div>
  );
};

export default PositionUpdate;
