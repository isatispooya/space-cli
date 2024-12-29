import Forms from "../../../components/forms";

import * as Yup from "yup";
import { CreateShareholderDTO } from "../types";
import { FormField } from "../../companies/types";
import {  useCompany } from "../../companies/hooks";
import { useUserData } from "../../users/hooks";
import { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { useShareholders } from "../hooks";

const CreateShareholdersPost = () => {
  const { mutate: postShareholders } = useShareholders.useCreate();
  const { data } = useCompany.useGet();
  const { data: users } = useUserData();

  const formFields: FormField[] = [
    { name: "number_of_shares", label: "تعداد سهام", type: "text" as const },
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options:
        data?.map((company: { name: string; id: number }) => ({
          label: company.name,
          value: company.id.toString(),
        })) || [],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select" as const,
      options:
        users?.map(
          (user: { first_name: string; last_name: string; id: number }) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.id.toString(),
          })
        ) || [],
    },
  ];

  const initialValues: CreateShareholderDTO = {
    number_of_shares: 0,
    company: 0,
    user: 0,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().optional(),
    number_of_shares: Yup.number()
      .required("تعداد سهام الزامی است")
      .min(1, "تعداد سهام باید بزرگتر از صفر باشد"),
    company: Yup.number().required("نام شرکت الزامی است"),
    user: Yup.number().required("کاربر الزامی است"),
    updated_at: Yup.string().optional(),
    created_at: Yup.string().optional(),
  });

  const onSubmit = async (
    values: CreateShareholderDTO,
    { setSubmitting , resetForm }: FormikHelpers<CreateShareholderDTO>
  ) => {
    try {
      await postShareholders(
        {
          ...values,
          company: Number(values.company),
          user: Number(values.user),
          id: 0,
        },
        {
          onSuccess: () => {
            toast.success("سهامدار با موفقیت ثبت شد");
            resetForm();
          },
          onError: (error) => {
            toast.error("خطایی رخ داده است");
            console.error("Error creating shareholder:", error);
          },
        }
      );
    } catch (error) {
      console.error("Error creating shareholder:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
      
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ثبت اطلاعات سهامدار"
      colors="text-[#29D2C7] "
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت سهامدار",
        loading: "در حال ارسال...",
      }}
      onSubmit={onSubmit}
    />
  );
};

export default CreateShareholdersPost;
