import toast from "react-hot-toast";
import Forms from "../../../components/forms";

import { ShareholdersTypes } from "../types";
import * as yup from "yup";
import { useShareHoldersStore } from "../store";
import { useShareholders } from "../hooks";
import { useUserData } from "../../users/hooks";
import {  useCompany } from "../../companies/hooks";
import { useNavigate } from "react-router-dom";

const EditShareholdForm: React.FC = () => {
  const { mutate } = useShareholders.useUpdate();
  const { id } = useShareHoldersStore();

  const navigate = useNavigate();
  const { data: shareholders } = useShareholders.useGet();
  const { data: users } = useUserData();
  const { data: companies } = useCompany.useGet();

  const shareholder = shareholders?.find(
    (item: ShareholdersTypes) => item.id === Number(id)
  );

  if (!shareholder && !id) {
    navigate("/shareholders/table");
  }

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    number_of_shares: yup.number().required("سهام الزامی است"),
    company: yup.number().required("شرکت الزامی است"),
    user: yup.number().required("کاربر الزامی است"),
    name: yup.string().required("نام الزامی است"),
    updated_at: yup.string().optional(),
    created_at: yup.string().optional(),
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

  const initialValues: ShareholdersTypes = {
    number_of_shares: shareholder?.number_of_shares || 0,
    company: parseInt(shareholder?.company.toString() || "0"),
    user: parseInt(shareholder?.user.toString() || "0"),
    id: shareholder?.id || 0,
  };

  const onSubmit = (values: ShareholdersTypes) => {
    if (shareholder?.id) {
      const formattedValues = {
        ...values,
        company: parseInt(values.company.toString()),
        user: parseInt(values.user.toString()),
        number_of_shares: parseInt(values.number_of_shares.toString()),
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
        formFields={formFields}
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
