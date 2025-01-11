import useCreatePos from "../hooks/useCreatePos";
import * as Yup from "yup";

import { PositionFormValues } from "../types";

import { useUserData } from "../../users/hooks";
import { usePositionData } from "../hooks";
import Forms from "../../../components/forms";
import { useCompany } from "../../companies/feature";
import { CompanyData } from "../../companies/types/companyData.type";

interface FormField {
  name: keyof PositionFormValues;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "select"
    | "checkbox"
    | "transferList"
    | "date";
  options?: { value: string; label: string }[];
  headerClassName?: string;
  headerAlign?: string;
}

interface User {
  id: number;
  first_name?: string;
  last_name?: string;
  uniqueIdentifier?: string;
}

interface Position {
  id: number;
  name: string;
}

const PositionCreate = () => {
  const { data: companies } = useCompany.useGet();
  const { data: users } = useUserData();
  const { data: positions } = usePositionData();
  const { mutate: createPosition } = useCreatePos();

  const validationSchema: Yup.ObjectSchema<PositionFormValues> = Yup.object({
    name: Yup.string().required("نام نقش الزامی است"),
    company: Yup.string().required("شرکت الزامی است"),
    start_date: Yup.string().required("تاریخ شروع الزامی است"),
    end_date: Yup.string().required("تاریخ پایان الزامی است"),
    description: Yup.string().default(""),
    parent: Yup.string().nullable().default(null),
    type_of_employment: Yup.string().nullable().default(null),
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
        companies?.map((company: CompanyData) => ({
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
        users?.map((user: User) => ({
          value: user.id,
          label: `${user.first_name || ''} ${user.last_name || ''} | ${user.uniqueIdentifier || ''}`,
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
      options: positions?.results?.map((position: Position) => ({
        value: position.id,
        label: position.name,
      })),
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

  const initialValues: PositionFormValues = {
    name: "",
    company: "",
    user: 0,
    parent: null,
    type_of_employment: "",
    description: "",
    start_date: "",
    end_date: "",
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
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const formData = {
            ...values,
            parent: values.parent || null,
            type_of_employment: values.type_of_employment || null,
          };
          await createPosition(formData);
        } catch (error) {
          console.error("Error creating position:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default PositionCreate;
