import toast from "react-hot-toast";
import Forms from "../../../../components/forms";
import { useCapital } from "../../hooks";
import { CapitalIncreaseTypes } from "../../types/capitalIncrease.type";
import * as yup from "yup";
import { useCapitalStore } from "../../store";
import { FormField } from "../../../companies/types";

const EditCapitalForm: React.FC = () => {
  const { mutate } = useCapital.useUpdate();
  const { id } = useCapitalStore();
  const { data } = useCapital.useGet();
  const capital = data?.find((item: CapitalIncreaseTypes) => item.id === id);

  const formFields: FormField[] = [
    {
      name: "company",
      label: "شرکت",
      type: "text",
    },
    {
      name: "number_of_shares",
      label: "تعداد سهام",
      type: "text",
    },
    {
      name: "position",
      label: "موقعیت",
      type: "text",
    },
    {
      name: "price",
      label: "قیمت",
      type: "text",
    },
    {
      name: "document",
      label: "سند",
      type: "file",
      value: undefined,
    },
  ];

  const initialValues = {
    id: capital?.id || 0,
    company: capital?.company || "",
    number_of_shares: capital?.number_of_shares || 0,
    position: capital?.position || "",
    price: capital?.price || 0,
    created_at: capital?.created_at || "",
    updated_at: capital?.updated_at || "",
    document: undefined,
  };

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    company: yup.string().required("شرکت الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    position: yup.string().required("موقعیت الزامی است"),
    price: yup.number().required("قیمت الزامی است"),
    document: yup.mixed().nullable(),
    created_at: yup.string().required(),
    updated_at: yup.string().required(),
  });

  const onSubmit = (values: CapitalIncreaseTypes) => {
    if (capital?.id) {
      mutate(
        { id: capital.id, data: values },
        {
          onSuccess: () => {
            toast.success("سود پرداختی با موفقیت ویرایش شد");
          },
          onError: () => {
            toast.error("خطایی رخ داده است");
          },
        }
      );
    }
  };

  return (
    <Forms
      formFields={formFields as FormField[]}
      initialValues={initialValues as unknown as CapitalIncreaseTypes}
      validationSchema={validationSchema as unknown as yup.ObjectSchema<CapitalIncreaseTypes>}
      colors="text-[#5677BC]"
      buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
      showCloseButton={true}
      onSubmit={onSubmit}
      submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
      title="ویرایش سود پرداختی"
    />
  );
};

export default EditCapitalForm;
