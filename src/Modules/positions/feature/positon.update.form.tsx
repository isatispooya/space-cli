import * as Yup from "yup";
import Forms from "../../../components/forms";
import { useUserData } from "../../users/hooks";
import { useCompany } from "../../companies/hooks";
import { usePositionData, useUpdatePosition } from "../hooks";
import { PositionData, PositionFormValues } from "../types";
import { FormField } from "../../companies/types";
import { CompanyData } from "../../companies/types/companyData.type";
import { UserData } from "../../users/types";

interface PositionUpdateProps {
  data: PositionData | null;
  onClose: () => void;
}

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

const typeOfEmploymentTranslations: Record<string, string> = {
  full_time: "تمام وقت",
  part_time: "پاره وقت",
  contract: "قراردادی",
  freelance: "فریلنسر",
  internship: "کارآموزی",
};

const PositionUpdate = ({ data, onClose }: PositionUpdateProps) => {
  const { mutate: updatePosition } = useUpdatePosition(data?.id as number);
  const { data: companies } = useCompany.useGet();
  const { data: users } = useUserData();
  const { data: positions } = usePositionData();

  const formFields: FormField[] = [
    { name: "name", label: "نام نقش", type: "text" },
    {
      name: "company",
      label: "شرکت",
      type: "select",
      options:
        companies?.map((company: CompanyData) => ({
          value: company.id,
          label: company.name,
        })) || [],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select",
      options:
        users?.map((user: UserData) => ({
          value: user.id,
          label: user.first_name || user.last_name,
        })) || [],
    },

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
      options: Object.entries(typeOfEmploymentTranslations).map(
        ([value, label]) => ({
          value,
          label,
        })
      ),
    },
  ];

  const initialValues: PositionFormValues = {
    name: data?.name || "",
    company: String(data?.company || companies?.[0]?.id || ""),
    user: Number(data?.user || 0),
    parent: String(data?.parent || ""),
    type_of_employment: String(data?.type_of_employment || ""),
    description: data?.description || "",
    start_date: data?.start_date || "",
    end_date: data?.end_date || "",
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={
        validationSchema as Yup.ObjectSchema<PositionFormValues>
      }
      showCloseButton={true}
      onClose={onClose}
      title="بروزرسانی نقش"
      colors="text-indigo-600"
      buttonColors="bg-indigo-600 hover:bg-indigo-700"
      submitButtonText={{
        default: "بروزرسانی نقش",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await updatePosition({
            id: data?.id as number,
            data: values,
          });
          onClose();
        } catch (error) {
          console.error("Error updating position:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default PositionUpdate;
