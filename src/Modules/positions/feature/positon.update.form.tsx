import * as Yup from "yup";
import { Forms, LoaderLg, NoContent } from "../../../components";
import { usePosition } from "../hooks";
import { FormFieldType } from "@/types";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-jalaali";
import { PositionPostType } from "../types";
import { useCompany } from "../../companies/hooks";
import { CompanyType } from "../../companies/types";

interface UserObjectType {
  id: number;
  first_name?: string;
  last_name?: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("نام نقش الزامی است"),
  company: Yup.string().required("شرکت الزامی است"),
  start_date: Yup.string().required("تاریخ شروع الزامی است"),
  end_date: Yup.string().required("تاریخ پایان الزامی است"),
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

const PositionUpdateForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { mutate: updatePosition } = usePosition.useUpdate(Number(id));
  const { data: getUpdatePosition, isPending, refetch } = usePosition.useGet();
  const { data: companies = [] } = useCompany.useGet();

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isPending) {
    return <LoaderLg />;
  }

  const specificUser = getUpdatePosition?.find(
    (position) => position.id === Number(id)
  );

  if (!getUpdatePosition) {
    return <NoContent label="نقش یافت نشد" />;
  }

  const userData = specificUser?.user as unknown as UserObjectType | number;
  const userId = typeof userData === "object" ? userData.id : userData;
  const userFirstName = typeof userData === "object" ? userData.first_name : "";
  const userLastName = typeof userData === "object" ? userData.last_name : "";

  const formFields: FormFieldType[] = [
    { name: "name", label: "نام نقش", type: "text" },
    {
      name: "company",
      label: "شرکت",
      type: "select",
      options: companies.flatMap((companyList: CompanyType[]) =>
        companyList.map((company: CompanyType) => ({
          value: company.id.toString(),
          label: company.name,
        }))
      ),
    },
    {
      name: "user",
      label: "کاربر",
      type: "select",
      options: [
        {
          value: String(userId) || "",
          label: `${userFirstName || ""} ${userLastName || ""}`,
        },
      ],
    },
    {
      name: "start_date",
      label: "تاریخ شروع",
      type: "date",
      format: (value: string) => moment(value).format("jYYYY/jMM/jDD"),
    },
    {
      name: "end_date",
      label: "تاریخ پایان",
      type: "date",
      format: (value: string) => moment(value).format("jYYYY/jMM/jDD"),
    },
    { name: "description", label: "توضیحات", type: "text" },
    {
      name: "parent",
      label: "ارشد",
      type: "select",
      options: [
        {
          value: specificUser?.parent?.id
            ? specificUser.parent.id.toString()
            : "",
          label: specificUser?.parent?.name || "",
        },
      ],
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

  const initialValues: PositionPostType = {
    name: specificUser?.name || "",
    company: Number(specificUser?.company_detail?.id) || 0,
    user: Number(userId) || 0,
    parent: specificUser?.parent?.id || 0,
    type_of_employment: specificUser?.type_of_employment || "",
    description: specificUser?.description || "",
    start_date: specificUser?.start_date
      ? moment(specificUser.start_date).format("jYYYY/jMM/jDD")
      : "",
    end_date: specificUser?.end_date
      ? moment(specificUser.end_date).format("jYYYY/jMM/jDD")
      : "",
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={
        validationSchema as unknown as Yup.ObjectSchema<PositionPostType>
      }
      showCloseButton={false}
      title="بروزرسانی سمت"
      colors="text-[#5677BC]"
      buttonColors="bg-[#5677BC] hover:bg-[#5677BC]"
      submitButtonText={{
        default: "بروزرسانی نقش",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const formattedValues = {
            ...values,
            start_date: values.start_date
              ? formatDate(values.start_date)
              : specificUser?.start_date,
            end_date: values.end_date
              ? formatDate(values.end_date)
              : specificUser?.end_date,
            parent: values.parent ? values.parent.toString() : null,
          };

          if (formattedValues.start_date === "NaN-NaN-NaN") {
            formattedValues.start_date = specificUser?.start_date;
          }
          if (formattedValues.end_date === "NaN-NaN-NaN") {
            formattedValues.end_date = specificUser?.end_date;
          }

          await updatePosition({
            data: {
              ...formattedValues,
              parent: formattedValues.parent
                ? Number(formattedValues.parent)
                : null,
              start_date: formattedValues.start_date || "",
              end_date: formattedValues.end_date || "",
            },
          });
          refetch();
          navigate(`/positions/table/`);
        } catch (error) {
          console.error("Error updating position:", error);
          alert("خطا در بروزرسانی نقش. لطفاً دوباره تلاش کنید.");
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default PositionUpdateForm;
