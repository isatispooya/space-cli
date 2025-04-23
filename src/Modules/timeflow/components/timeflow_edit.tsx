/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { Forms, LoaderLg, NoContent } from "../../../components";
import { FormField } from "../../../types";
import { useParams } from "react-router-dom";
import { useTimeflow } from "../hooks";
import { TimeflowEditType } from "../types";

const validationSchema = Yup.object().shape({
  time_user: Yup.string().nullable().required("زمان ورود الزامی است"),
});

const TimeflowEditForm = () => {
  const { data, refetch, isLoading } = useTimeflow.useGetUserAllTimeflow();
  const { id } = useParams();
  const { mutate: edit } = useTimeflow.usePatchTimeflowEdit();

  if (isLoading) {
    return <LoaderLg />;
  }

  const EDITABLE_DATA = data?.find((item: any) => item.id === Number(id));
  console.log(EDITABLE_DATA);

  if (!EDITABLE_DATA) {
    return <NoContent label="اطلاعات مورد نظر یافت نشد" />;
  }

  const formFields: FormField[] = [
    {
      name: "time_user",
      label: "تعیین زمان ورود",
      type: "timePicker",
    },

    {
      name: "type",
      label: "نوع",
      type: "select",
      options: [
        { label: "ورود", value: "login" },
        { label: "خروج", value: "logout" },
        { label: "مرخصی", value: "leave" },
        { label: "پایان مرخصی", value: "end-leave" },
        { label: "شروع ماموریت", value: "start-mission" },
        { label: "پایان ماموریت", value: "end-mission" },
      ],
    },
  ];

  const initialValues = {
    time_user: EDITABLE_DATA.time_user || "",
    type: EDITABLE_DATA.type || "",
    date: EDITABLE_DATA.user.date || "",
  };

  const onSubmit = (values: TimeflowEditType) => {
    edit({ data: values, id: Number(id) });
    refetch();
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      showCloseButton={false}
      title={`تردد ${EDITABLE_DATA.time_user.toLocaleString("fa-IR")} `}
      colors="text-[#5677BC]"
      buttonColors="bg-[#5677BC] hover:bg-[#5677BC]"
      submitButtonText={{
        default: "بروزرسانی تردد",
        loading: "در حال ارسال...",
      }}
      onSubmit={onSubmit}
    />
  );
};

export default TimeflowEditForm;
