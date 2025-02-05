/* eslint-disable @typescript-eslint/no-explicit-any */
import { Formik, Form, Field, FieldProps, FormikValues } from "formik";
import { motion } from "framer-motion";
import SelectInput from "./inputs/selectInput";
import FormInput from "./inputs/formInput";
import { FormField } from "../types";
import { FormikHelpers } from "formik";
import { AnyObject, Maybe, ObjectSchema } from "yup";
import { RiCloseLargeLine } from "react-icons/ri";
import ViewFileInput from "./inputs/viewFileInput";
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import { useState } from "react";
import { BiPlus, BiMinus } from "react-icons/bi";
import FileInput from "./inputs/uploadInput";
import MultiSelect from "./inputs/multiSelect";
import DetailBox from "./formDetail";

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
  checkboxColors?: {
    borderColor?: string;
    checkedColor?: string;
  };
  disabledFields?: boolean;
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
  checkboxColors = {
    borderColor: "border-secondary-500",
    checkedColor: "checked:border-[#5677BC] checked:bg-[#5677BC]",
  },
}: FormsProps<T>) => {
  const [dynamicFieldCounts, setDynamicFieldCounts] = useState<{
    [key: string]: number;
  }>({});

  const handleAddField = (fieldName: string, maxFields?: number) => {
    setDynamicFieldCounts((prev) => {
      const currentCount = prev[fieldName] || 1;
      if (maxFields && currentCount >= maxFields) return prev;
      return { ...prev, [fieldName]: currentCount + 1 };
    });
  };

  const handleRemoveField = (fieldName: string) => {
    setDynamicFieldCounts((prev) => ({
      ...prev,
      [fieldName]: Math.max(1, (prev[fieldName] || 1) - 1),
    }));
  };

  const handleFieldChange = (
    fieldName: string,
    value: any,
    setFieldValue: (field: string, value: any) => void,
    format?: (value: any) => any
  ) => {
    const formattedValue = format ? format(value) : value;
    setFieldValue(fieldName, formattedValue);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        try {
          await onSubmit(values, actions);
        } finally {
          actions.setSubmitting(false);
        }
      }}
    >
      {({ errors, touched, isSubmitting, setFieldValue }) => (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          dir="rtl"
          className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-[32px] shadow-lg"
        >
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
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
          <Form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {formFields.map((field) => (
              <div key={field.name} className="col-span-1">
                {field.type === "detail" && (
                  <div>
                    {field.value.map((detail, index) => (
                      <DetailBox
                        key={index}
                        title={detail.title}
                        data={detail.data}
                        isCopied={false}
                        setIsCopied={() => {}}
                      />
                    ))}
                  </div>
                )}
                {field.type === "dynamic" ? (
                  <div className="space-y-4">
                    {[...Array(dynamicFieldCounts[field.name] || 1)].map(
                      (_, index) => (
                        <div
                          key={`${field.name}-${index}`}
                          className="relative"
                        >
                          <Field name={`${field.name}.${index}`}>
                            {({ field: fieldProps }: FieldProps) => (
                              <FormInput
                                {...fieldProps}
                                type="text"
                                label={`${field.label} ${index + 1}`}
                                className="h-12"
                                disabled={field.disabled}
                                format={field.format}
                                onChange={(e) => {
                                  const newValue = e.target.value;
                                  setFieldValue(field.name, newValue);
                                }}
                              />
                            )}
                          </Field>
                          {index ===
                            (dynamicFieldCounts[field.name] || 1) - 1 && (
                            <div className="flex gap-2 mt-2">
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() =>
                                  handleAddField(
                                    field.name,
                                    field.dynamicProps?.maxFields
                                  )
                                }
                                className={`flex items-center gap-1 px-3 py-1 rounded-md text-sm ${colors} bg-gray-100 hover:bg-gray-200`}
                              >
                                <BiPlus />
                                {field.dynamicProps?.addButtonText || "افزودن"}
                              </motion.button>
                              {(dynamicFieldCounts[field.name] || 1) > 1 && (
                                <motion.button
                                  type="button"
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => handleRemoveField(field.name)}
                                  className="flex items-center gap-1 px-3 py-1 rounded-md text-sm text-red-500 bg-red-50 hover:bg-red-100"
                                >
                                  <BiMinus />
                                  {field.dynamicProps?.removeButtonText ||
                                    "حذف"}
                                </motion.button>
                              )}
                            </div>
                          )}
                        </div>
                      )
                    )}
                  </div>
                ) : field.type === "file" ? (
                  <Field name={field.name}>
                    {() => (
                      <FileInput
                        label={field.label}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          handleFieldChange(
                            field.name,
                            file,
                            setFieldValue,
                            field.format
                          );
                        }}
                        accept={field.fileProps?.accept}
                        className="w-full"
                      />
                    )}
                  </Field>
                ) : field.type === "viewFile" ? (
                  <ViewFileInput
                    url={field.viewFileProps?.url}
                    label={field.label}
                    fileType={field.viewFileProps?.fileType}
                    showPreview={field.viewFileProps?.showPreview}
                  />
                ) : field.type === "select" ? (
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
                          handleFieldChange(
                            field.name.toString(),
                            newValue,
                            setFieldValue,
                            field.format
                          )
                        }
                        className="h-5"
                        placeholder={`جستجو ${field.label}...`}
                        disabled={field.disabled}
                      />
                    )}
                  </Field>
                ) : field.type === "checkbox" ? (
                  <Field name={field.name}>
                    {({ field: fieldProps }: FieldProps) => (
                      <div className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                        <input
                          {...fieldProps}
                          type="checkbox"
                          className={`relative float-left -ms-[1.5rem] me-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid ${checkboxColors.borderColor} outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] ${checkboxColors.checkedColor} checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ms-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-black/60 focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-black/60 focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-checkbox checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ms-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent rtl:float-right dark:border-neutral-400 dark:checked:border-primary dark:checked:bg-primary`}
                          id={`checkbox-${field.name}`}
                          aria-label={field.label}
                        />
                        <label
                          htmlFor={`checkbox-${field.name}`}
                          className="ml-2"
                        >
                          {field.label}
                        </label>
                      </div>
                    )}
                  </Field>
                ) : field.type === "date" ? (
                  <Field name={field.name}>
                    {({
                      field: fieldProps,
                      form: { setFieldValue },
                    }: FieldProps) => (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          {field.label}
                        </label>
                        <DatePicker
                          value={fieldProps.value}
                          onChange={(date) => {
                            handleFieldChange(
                              field.name,
                              date,
                              setFieldValue,
                              field.format
                            );
                            return false;
                          }}
                          calendar={persian}
                          locale={persian_fa}
                          inputClass="h-10 w-[93%] px-4 rounded-md border border-gray-300 bg-white py-1 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                          placeholder={`انتخاب ${field.label}...`}
                          disabled={field.disabled}
                          containerClassName="w-full"
                        />
                      </div>
                    )}
                  </Field>
                ) : field.type === "multiSelect" ? (
                  <Field name={field.name}>
                    {({ field: { value } }: FieldProps) => (
                      <MultiSelect
                        options={field.options || []}
                        selectedValues={value || []}
                        onChange={(newValue) =>
                          handleFieldChange(
                            field.name,
                            newValue,
                            setFieldValue,
                            field.format
                          )
                        }
                        label={field.label}
                        placeholder={`جستجو ${field.label}...`}
                        disabled={field.disabled}
                        maxSelect={field.multiSelectProps?.maxSelect}
                      />
                    )}
                  </Field>
                ) : (
                  <Field name={field.name}>
                    {({
                      field: fieldProps,
                      form: { setFieldValue },
                    }: FieldProps) => (
                      <FormInput
                        {...fieldProps}
                        type={field.type}
                        label={field.label}
                        className="h-12"
                        disabled={field.disabled}
                        format={field.format}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setFieldValue(field.name, newValue);
                        }}
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

            <div className="col-span-1 sm:col-span-2">
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
};

export default Forms;
