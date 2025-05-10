import { Forms } from "../../../../components";

import * as Yup from "yup";
import {
  CreateShareholderType,
  ShareholdersType,
} from "../../types/shareholders.type";
import { FormFieldType } from "@/types";
import { useCompany } from "../../../companies/hooks";
import { useUserData } from "../../../users/hooks";
import { FormikHelpers } from "formik";
import toast from "react-hot-toast";
import { useShareholders } from "../../hooks";
import { CompanyType } from "../../../companies/types";

const CreateShareholdersPost = () => {
  const { mutate: postShareholders } = useShareholders.useCreate();
  const { data } = useCompany.useGet();
  const { data: users } = useUserData();

  const formFields: FormFieldType[] = [
    { name: "number_of_shares", label: "تعداد سهام", type: "text" as const },
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options:
        data?.flatMap((companyList: CompanyType[]) =>
          companyList.map((company: CompanyType) => ({
            label: company.name || "",
            value: company.id.toString(),
          }))
        ) || [],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select" as const,
      options:
        users?.map(
          (user: {
            first_name: string;
            last_name: string;
            id: number;
            uniqueIdentifier: string;
          }) => ({
            label: `${user.first_name} ${user.last_name} | ${user.uniqueIdentifier}`,
            value: user.id.toString(),
          })
        ) || [],
    },
  ];

  const initialValues: ShareholdersType = {
    number_of_shares: 0,
    company: "",
    user: 0,
  };

  const validationSchema = Yup.object().shape({
    id: Yup.number().optional(),
    used_precedence: Yup.number().optional(),
    precedence_count: Yup.number().optional(),
    precedence_used: Yup.number().optional(),
    precedence: Yup.number().optional(),
    name: Yup.string().required("نام الزامی است"),
    number_of_shares: Yup.number().required("تعداد سهام الزامی است"),
    company: Yup.string().required("نام شرکت الزامی است"),
    user: Yup.number().required("کاربر الزامی است"),
    company_national_id: Yup.string().optional(),
    first_name: Yup.string().optional(),
    last_name: Yup.string().optional(),
    uniqueIdentifier: Yup.string().optional(),
    capital_increase_payment: Yup.number().optional(),
    company_detail: Yup.object()
      .shape({
        name: Yup.string().required("نام شرکت الزامی است"),
        company_type: Yup.string().required("نوع شرکت الزامی است"),
        address: Yup.string().optional(),
        description: Yup.string().optional(),
        email: Yup.string().optional(),
        id: Yup.number().required("شناسه شرکت الزامی است"),
      })
      .optional(),
    user_detail: Yup.object()
      .shape({
        first_name: Yup.string().required("نام کاربر الزامی است"),
        last_name: Yup.string().required("نام خانوادگی کاربر الزامی است"),
        uniqueIdentifier: Yup.string().required("شناسه کاربر الزامی است"),
      })
      .optional(),
    updated_at: Yup.string().optional(),
    created_at: Yup.string().optional(),
  }) as Yup.ObjectSchema<CreateShareholderType>;

  const onSubmit = async (
    values: CreateShareholderType,
    { setSubmitting, resetForm }: FormikHelpers<CreateShareholderType>
  ) => {
    try {
      await postShareholders(
        {
          ...values,
          company: values.company?.toString() ?? "",
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
