import { Forms } from "../../../../components";
import { useCompany } from "../../../companies/hooks";
import { useUserData } from "../../../users/hooks";
import { useCapital } from "../../hooks";
import * as Yup from "yup";
import { FormFieldType } from "@/types";
import toast from "react-hot-toast";
import { CapitalIncreaseCreateType } from "../../types/capitalCreate.type";
import { CompanyType } from "../../../companies/types";

const CreateCapitalIncreaseForm = () => {
  const { mutate: postCapitalIncrease } = useCapital.useCreate();
  const { data: companies } = useCompany.useGet();
  const { data: users } = useUserData();

  const formFields: FormFieldType[] = [
    { name: "amount", label: "تعداد سهام", type: "text" as const },
    { name: "value", label: "قیمت", type: "text" as const },
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options:
        companies?.flatMap((companyList: CompanyType[]) =>
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

  const initialValues = {
    company: "",
    amount: "",
    value: "",
    user: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("شرکت الزامی است"),
    amount: Yup.string()
      .required("تعداد سهام الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    value: Yup.string()
      .required("قیمت الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    user: Yup.string().required("کاربر الزامی است"),
  });

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ثبت  پرداخت افزایش سود"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت ",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (
        values: CapitalIncreaseCreateType,
        { setSubmitting, resetForm }
      ) => {
        try {
          await postCapitalIncrease(values, {
            onSuccess: () => {
              toast.success("سود پرداختی با موفقیت ثبت شد");
              resetForm();
            },
            onError: () => {
              toast.error("خطایی رخ داده است");
            },
          });
        } catch (error) {
          console.error("Error creating shareholder:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default CreateCapitalIncreaseForm;
