import * as Yup from "yup";
import { usePosition } from "../hooks";
import { useUserData } from "../../users/hooks";
import Forms from "../../../components/forms";
import { useCompany } from "../../companies/hooks";
import { CompanyTypes } from "../../companies/types";
import { useNavigate } from "react-router-dom";
import { PositionPostTypes, PositionTypes } from "../types";
import { FormField } from "../../../types";
import { UserData } from "../../users/types";

const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const PositionCreate = () => {
  const navigate = useNavigate();
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
    description: Yup.string().required(),
    parent: Yup.object().nullable(),
    type_of_employment: Yup.string().required(),
    user: Yup.object().required(),
    id: Yup.number().optional(),
    created_at: Yup.string().optional(),
    sender: Yup.string().optional(),
    first_name: Yup.string().optional(),
    last_name: Yup.string().optional(),
    company_detail: Yup.object().optional(),
  }) as Yup.ObjectSchema<PositionTypes>;

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

  const initialValues: PositionTypes = {
    name: "",
    company: 0,
    user: {
      first_name: "",
      last_name: "",
      id: 0,
    },
    parent: null,
    type_of_employment: "",
    description: "",
    start_date: "",
    end_date: "",
    id: 0,
    created_at: "",
    sender: "",
    first_name: "",
    last_name: "",
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
            parent: values.parent,
            type_of_employment: values.type_of_employment || null,
            start_date: values.start_date
              ? formatDate(values.start_date)
              : null,
            end_date: values.end_date ? formatDate(values.end_date) : null,
          };
          await createPosition(formData as unknown as PositionPostTypes);
          navigate("/positions/table");
          refetch();
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
