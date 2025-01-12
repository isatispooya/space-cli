import * as Yup from "yup";
import Forms from "../../../components/forms";
import { useUserData } from "../../users/hooks";
import { useCompany } from "../../companies/hooks";
import { usePositionData, useUpdatePosition } from "../hooks";
import { PositionData, PositionFormValues } from "../types";
import { FormField } from "../../companies/types";
import { CompanyData } from "../../companies/types/companyData.type";
import { UserData } from "../../users/types";
import { useNavigate, useParams } from "react-router-dom";
import { useGetUpdatePosition } from "../hooks/usegetupdate";
import { format } from "date-fns";
import moment from "moment-jalaali";


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

const PositionUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { mutate: updatePosition } = useUpdatePosition(Number(id));
  const { data: companies } = useCompany.useGet();
  const { data: users } = useUserData();
  const { data: positions } = usePositionData();

  const { data: getUpdatePosition } = useGetUpdatePosition(Number(id));

  console.log(users);
  

  
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
    { name: "description", label: "توضیحات", type: "text" },
    {
      name: "parent",
      label: "ارشد",
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
console.log(getUpdatePosition);

  const initialValues: PositionFormValues = {
    name: getUpdatePosition?.name,
    company: getUpdatePosition?.company_detail?.id,
    user: getUpdatePosition?.user?.id,
    parent: getUpdatePosition?.parent,
    type_of_employment: getUpdatePosition?.type_of_employment,
    description: getUpdatePosition?.description,
    start_date: getUpdatePosition?.start_date ? moment(getUpdatePosition.start_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD') : "",
    end_date: getUpdatePosition?.end_date ? moment(getUpdatePosition.end_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD') : "",
  };

  if (!getUpdatePosition) {
    return <div>در حال بارگذاری...</div>;
  }



  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={
        validationSchema as Yup.ObjectSchema<PositionFormValues>
      }
      showCloseButton={false}
      title="بروزرسانی نقش"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
      submitButtonText={{
        default: "بروزرسانی نقش",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const formattedValues = {
            ...values,
            start_date: moment(values.start_date, 'jYYYY/jMM/jDD').format('YYYY-MM-DDTHH:mm:ssZ'),
            end_date: moment(values.end_date, 'jYYYY/jMM/jDD').format('YYYY-MM-DDTHH:mm:ssZ'),
          };

          await updatePosition({
            id: Number(id),
            data: formattedValues,
          });
          navigate("/positions/table");
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
