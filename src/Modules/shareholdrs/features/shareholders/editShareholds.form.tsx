import toast from "react-hot-toast";
import { Forms } from "../../../../components";
import { ShareholdersType } from "../../types/shareholders.type";
import * as yup from "yup";
import { useShareholders } from "../../hooks";
import { useCompany } from "../../../companies/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { FormFieldType } from "@/types";
import { CompanyType } from "../../../companies/types";

const EditShareholdForm: React.FC = () => {
  const { mutate } = useShareholders.useUpdate();
  const { id } = useParams();

  const navigate = useNavigate();
  const { data: shareholders } = useShareholders.useGet();
  const { data: companies } = useCompany.useGet();

  const shareholder = shareholders?.find((item) => item.id === Number(id));

  if (!shareholder && !id) {
    navigate("/shareholders/table");
  }

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    used_precedence: yup.number().optional(),
    precedence_count: yup.number().optional(),
    precedence_used: yup.number().optional(),
    precedence: yup.number().optional(),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    company: yup.string().required("نام شرکت الزامی است"),
    user: yup.number().required("کاربر الزامی است"),
    user_name: yup.string().optional(),
    company_national_id: yup.string().optional(),
    first_name: yup.string().optional(),
    last_name: yup.string().optional(),
    uniqueIdentifier: yup.string().optional(),
    capital_increase_payment: yup.number().optional(),
    company_detail: yup.object().optional(),
    user_detail: yup.object().optional(),
    updated_at: yup.string().optional(),
    created_at: yup.string().optional(),
    name: yup.string().required("نام الزامی است"),
  }) as yup.ObjectSchema<ShareholdersType>;

  const formFields = [
    {
      name: "number_of_shares",
      label: "سهام",
      type: "text" as const,
    },
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

      options: [
        {
          value: shareholder?.user_detail?.id ?? "",
          label:
            shareholder?.user_detail?.first_name +
              " " +
              shareholder?.user_detail?.last_name || "",
        },
      ],
    },
  ];

  const initialValues: ShareholdersType = {
    number_of_shares: Number(shareholder?.number_of_shares) || 0,
    company: shareholder?.company_detail?.name?.toString() || "",
    user: Number(shareholder?.user_detail?.id) || 0,
    id: Number(shareholder?.id) || 0,
  };

  const onSubmit = (values: ShareholdersType) => {
    if (shareholder?.id) {
      const formattedValues = {
        ...values,
        company: values.company?.toString() ?? "0",
        user: Number(values.user) || 0,
        number_of_shares: parseInt(values.number_of_shares?.toString() || "0"),
      };

      mutate(
        { id: shareholder.id.toString(), data: formattedValues },
        {
          onSuccess: () => {
            toast.success("سهامدار با موفقیت ویرایش شد");
            navigate("/shareholders/table");
          },
          onError: () => {
            toast.error("خطایی رخ داده است");
          },
        }
      );
    }
  };

  return (
    <>
      <Forms
        formFields={formFields as FormFieldType[]}
        initialValues={initialValues}
        validationSchema={validationSchema}
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        showCloseButton={true}
        onSubmit={onSubmit}
        submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
        title="ویرایش سهامدار"
      />
    </>
  );
};

export default EditShareholdForm;
