import * as Yup from "yup";
import Forms from "../../../components/forms";

import { usePositionData, useUpdatePosition } from "../hooks";
import { PositionData, PositionFormValues } from "../types";
import { FormField } from "../../companies/types";
import { CompanyData } from "../../companies/types/companyData.type";
import { UserData } from "../../users/types";
import { useNavigate } from "react-router-dom";
import moment from "moment-jalaali";
import { useUpdatePositionStore } from "../store/updatePosition";


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
  const navigate = useNavigate();
  const { id } = useUpdatePositionStore();
  const { mutate: updatePosition } = useUpdatePosition(Number(id));
  const { data: getUpdatePosition, isPending } = usePositionData();

  const position = getUpdatePosition?.find(
    (item: PositionData) => item.id === Number(id)
  );
  console.log(position);
  

  if (isPending) {
    return <div>Loading...</div>;
  }

  const formFields: FormField[] = [
    { name: "name", label: "نام نقش", type: "text" },
    {
      name: "company",
      label: "شرکت",
      type: "select",
      options: [{
        value: position?.company_detail?.id || '',
        label: position?.company_detail?.name || '',
      }],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select",
      options: Array.isArray(position?.user)
        ? position.user.map((user: UserData) => ({
            value: user.id,
            label: `${user.first_name || ''} ${user.last_name || ''} | ${user.uniqueIdentifier || ''}`,
          }))
        : [],
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
          position?.parent_position?.map((position: PositionData) => ({
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
    name: position?.name || "",
    company: position?.company_detail?.id || "",
    user: position?.user?.id || "",
    parent: position?.parent || "",
    type_of_employment: position?.type_of_employment || "",
    description: position?.description || "",
    start_date: position?.start_date ? moment(position.start_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD') : "",
    end_date: position?.end_date ? moment(position.end_date, 'YYYY-MM-DD').format('jYYYY/jMM/jDD') : "",
  };



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
