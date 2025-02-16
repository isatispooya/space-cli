import toast from "react-hot-toast";
import Forms from "../../../../components/forms";
import { ShareholdersTypes } from "../../types/shareholders.type";
import * as yup from "yup";
import { useShareholders } from "../../hooks";
import { useCompany } from "../../../companies/hooks";
import { useNavigate, useParams } from "react-router-dom";
import { FormField } from "../../../../types";
import { NewShareholdersType } from "../../types/new.type";

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
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    company: yup.number().required("نام شرکت الزامی است"),
    user: yup.number().required("کاربر الزامی است"),
    user_name: yup.string().optional(),
    company_detail: yup.object().optional(),
    user_detail: yup.object().optional(),
    updated_at: yup.string().optional(),
    created_at: yup.string().optional(),
    name: yup.string().required("نام الزامی است"),
  }) as yup.ObjectSchema<ShareholdersTypes>;

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
        companies?.map((company: { name: string; id: number }) => ({
          label: company.name,
          value: company.id,
        })) || [],
    },
    {
      name: "user",
      label: "کاربر",
      type: "select" as const,

      options: [
        {
          value: shareholder?.user ?? "",
          label: shareholder?.user?.toString() || "",
        },
      ],
    },
  ];

  const initialValues: NewShareholdersType = {
    number_of_shares: shareholder?.number_of_shares || 0,
    company: shareholder?.company || 0 ,
    user: shareholder?.user || 0,
    id: shareholder?.id || 0,
  };

  const onSubmit = (values: NewShareholdersType) => {
    if (shareholder?.id) {
      const formattedValues = {
        ...values,
        company: parseInt(values.company.toString()),
        user: parseInt(values.user?.toString() || "0"),
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
        formFields={formFields as FormField[]}
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
