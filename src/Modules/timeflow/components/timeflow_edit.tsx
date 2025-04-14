/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";
import { Forms, LoaderLg, NoContent } from "../../../components";
import { FormField } from "../../../types";
import {  useParams } from "react-router-dom";
import { useTimeflow } from "../hooks";
import { TimeflowEditType } from "../types";

const validationSchema = Yup.object().shape({
  time_user: Yup.date().nullable().required("زمان ورود الزامی است"),
});

const TimeflowEditForm = () => {
  const { data, refetch, isLoading } = useTimeflow.useGetUserAllTimeflow();
  const { id } = useParams();
  const { mutate: edit } = useTimeflow.usePatchTimeflowEdit();
  

  if (isLoading) {
    return <LoaderLg />;
  }

  const EDITABLE_DATA = data?.find((item: any) => item.id === Number(id));

  if (!EDITABLE_DATA) {
    return <NoContent label="اطلاعات مورد نظر یافت نشد" />;
  }

  const formFields: FormField[] = [
    {
      name: "time_user",
      label: "تایین زمان ورود",
      type: "timePicker",
    },
  ];

  const initialValues = {
    time_user: EDITABLE_DATA.time_user || "",
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
      title="بروزرسانی تردد"
      colors="text-[#5677BC]"
      buttonColors="bg-[#5677BC] hover:bg-[#5677BC]"
      submitButtonText={{
        default: "بروزرسانی نقش",
        loading: "در حال ارسال...",
      }}
      onSubmit={onSubmit}
    />
  );
};

export default TimeflowEditForm;
