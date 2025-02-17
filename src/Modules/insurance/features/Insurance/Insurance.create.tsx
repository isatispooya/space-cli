import { ErrorResponse, FormField } from "../../../../types";
import useInsurance from "../../hooks/useInsurance";
import { Forms } from "../../../../components";
import * as yup from "yup";
import Toast from "../../../../components/common/toast/toast";
import { InsurancePostTypes } from "../../types";
import { FormikHelpers } from "formik";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { AxiosError } from "axios";

export const InsuranceCreate: React.FC = () => {
  const { mutate } = useInsurance.usePostFields();

  const validationSchema = yup.object({
    insurance_name: yup.string().required("نام بیمه الزامی است"),
    file_titles: yup
      .array()
      .of(yup.string().required())
      .required()
      .min(1, "حداقل یک عنوان فایل الزامی است"),
  });

  const formFields: FormField[] = [
    {
      name: "insurance_name",
      label: "نام بیمه",
      type: "text",
    },
    {
      name: "file_titles",
      label: "عناوین فایل",
      type: "dynamic",
      dynamicProps: {
        addButtonText: "افزودن عنوان جدید",
        removeButtonText: "حذف عنوان",
      },
    },
  ];

  const initialValues = {
    insurance_name: "",
    file_titles: [""],
  };

  const onSubmit = (
    values: typeof initialValues,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>
  ) => {
    const formData: InsurancePostTypes = {
      name: values.insurance_name,
      fields: values.file_titles,
    };

    mutate(formData, {
      onSuccess: () => {
        Toast("با موفقیت ثبت شد", <CheckmarkIcon />, "bg-green-500");
        resetForm();
      },
      onSettled: () => {
        setSubmitting(false);
      },
      onError: (error: AxiosError<unknown>) => {
        const errorMessage = (error.response?.data as ErrorResponse)?.error;
        Toast(
          errorMessage || "خطایی پیش آمده است",
          <ErrorIcon />,
          "bg-red-500"
        );
        setSubmitting(false);
      },
    });
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      title="ثبت بیمه نامه"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت",
        loading: "در حال ارسال...",
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    />
  );
};

export default InsuranceCreate;
