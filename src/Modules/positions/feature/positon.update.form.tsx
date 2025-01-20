import * as Yup from "yup";
import Forms from "../../../components/forms";
import { usePosition } from "../hooks";
import { FormField } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment-jalaali";
import { PositionPostTypes } from "../types";

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
  const { data: getUpdatePosition, isPending } = usePosition.useGet();

  const formatDate = (date: Date | string): string => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  if (isPending) {
    return <div>Loading...</div>;
  }

  const specificUser = getUpdatePosition?.find(
    (position) => position.id === Number(id)
  );

  if (!getUpdatePosition) {
    return <div>Position not found</div>;
  }



  const formFields: FormField[] = [
    { name: "name", label: "نام نقش", type: "text" },
    {
      name: "company",
      label: "شرکت",
      type: "select",
      options: [
        {
          value: specificUser?.company_detail?.id.toString() || "",
          label: specificUser?.company_detail?.name || "",
        },
      ],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select",
      options: [
        {
          value: specificUser?.user?.id.toString() || "",
          label: `${specificUser?.user?.first_name || ""} ${
            specificUser?.user?.last_name || ""
          }`,
        },
      ],
    },
    {
      name: "start_date",
      label: "تاریخ شروع",
      type: "date",
    },
    {
      name: "end_date",
      label: "تاریخ پایان",
      type: "date",
    },
    { name: "description", label: "توضیحات", type: "text" },
    {
      name: "parent",
      label: "ارشد",
      type: "select",
      options: [
        {
          value: specificUser?.parent?.id.toString() || "",
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

  const initialValues: PositionPostTypes = {
    name: specificUser?.name || "",
    company: Number(specificUser?.company_detail?.id) || 0,
    user: specificUser?.user?.id || 0,
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
        validationSchema as unknown as Yup.ObjectSchema<PositionPostTypes>
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
