/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { usePosition } from "../hooks";
import { useUserData } from "../../users/hooks";
import { Forms, Toast } from "../../../components";
import { useCompany } from "../../companies/hooks";
import { CompanyTypes } from "../../companies/types";
import { PositionPostTypes, PositionTypes, PositionFormTypes } from "../types";
import { ErrorResponse, FormField } from "../../../types";
import { UserData } from "../../users/types";
import { CheckmarkIcon, ErrorIcon } from "react-hot-toast";
import { AxiosError } from "axios";

const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const PositionCreate = () => {
  const { data: companies } = useCompany.useGet();
  const { refetch } = usePosition.useGet();
  const { data: users } = useUserData();
  const { data: positions } = usePosition.useGet();
  const { mutate: createPosition } = usePosition.useCreate();

  const validationSchema = Yup.object({
    name: Yup.string().required("نام نقش الزامی است"),
    company: Yup.number().required("شرکت الزامی است"),
    start_date: Yup.string().required(),
    end_date: Yup.string().required(),
    description: Yup.string(),
    parent: Yup.number().nullable(),
    type_of_employment: Yup.string().required(),
    user: Yup.number().required("کاربر الزامی است"),
    id: Yup.number().optional(),
    created_at: Yup.string().optional(),
    sender: Yup.string().optional(),
    first_name: Yup.string().optional(),
    last_name: Yup.string().optional(),
    company_detail: Yup.object().optional(),
  }) as Yup.ObjectSchema<PositionFormTypes>;

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
    {
      name: "name",
      label: "نام نقش",
      type: "text",
      headerClassName: "col-span-2 sm:col-span-1",
    },
    {
      name: "company",
      label: "شرکت",
      type: "select",
      headerClassName: "col-span-2 sm:col-span-1",
      options:
        companies?.map((company: CompanyTypes) => ({
          value: company.id.toString(),
          label: company.name,
        })) || [],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select",
      headerClassName: "col-span-2 sm:col-span-1",
      options:
        users?.map((user: UserData) => ({
          value: user.id,
          label: `${user.first_name || ""} ${user.last_name || ""} | ${
            user.uniqueIdentifier || ""
          }`,
        })) || [],
    },
    {
      name: "start_date",
      label: "تاریخ شروع",
      type: "date",
      headerClassName: "col-span-2 sm:col-span-1",
    },
    {
      name: "end_date",
      label: "تاریخ پایان",
      type: "date",
      headerClassName: "col-span-2 sm:col-span-1",
    },
    {
      name: "description",
      label: "توضیحات",
      type: "text",
      headerClassName: "col-span-2",
    },
    {
      name: "parent",
      label: "ارشد",
      type: "select",
      headerClassName: "col-span-2 sm:col-span-1",
      options:
        positions?.map((position: PositionTypes) => ({
          value: position.id.toString(),
          label: position.name,
        })) || [],
    },
    {
      name: "type_of_employment",
      label: "نوع استخدام",
      type: "select",
      headerClassName: "col-span-2 sm:col-span-1",
      options: typeOfEmploymentOptions.map((type) => ({
        value: type,
        label: typeOfEmploymentTranslations[type],
      })),
    },
  ];

  const initialValues: PositionFormTypes = {
    name: "",
    company: 0,
    user: 0,
    parent: null,
    type_of_employment: "",
    description: "",
    start_date: "",
    end_date: "",
    id: 0,
    sender: "",
    first_name: "",
    last_name: "",
  };

  const handleSubmit = async (
    values: PositionFormTypes,
    { setSubmitting, resetForm }: any
  ) => {
    try {
      const formData = {
        ...values,
        parent: values.parent,
        type_of_employment: values.type_of_employment || null,
        start_date: values.start_date
          ? formatDate(new Date(values.start_date).toISOString())
          : null,
        end_date: values.end_date
          ? formatDate(new Date(values.end_date).toISOString())
          : null,
      };
      await createPosition(formData as unknown as PositionPostTypes, {
        onSuccess: () => {
          Toast("نقش با موفقیت ایجاد شد", <CheckmarkIcon />, "bg-green-500");
          resetForm();
          refetch();
        },
        onError: (error: AxiosError<unknown>) => {
          const errorMessage = (error.response?.data as ErrorResponse)?.error;
          Toast(
            errorMessage || "نام کاربری یا رمز عبور اشتباه است",
            <ErrorIcon />,
            "bg-red-500"
          );
        },
      });
    } catch (error) {
      console.error("Error creating position:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ایجاد نقش"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
      submitButtonText={{
        default: "ایجاد نقش",
        loading: "در حال ارسال...",
      }}
      onSubmit={handleSubmit}
    />
  );
};

export default PositionCreate;
