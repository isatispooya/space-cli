import toast from "react-hot-toast";
import Forms from "../../../components/forms";
import { useUpdateCapital } from "../hooks";
import { CapitalIncreasePaymentTypes } from "../types";
import * as yup from "yup";

interface EditCapitalFormTypes {
  onClose: () => void;
  data: CapitalIncreasePaymentTypes | null;
}

const EditCapitalForm: React.FC<EditCapitalFormTypes> = ({ onClose, data }) => {
  const { mutate } = useUpdateCapital();

  const formFields = [
    {
      name: "company",
      label: "شرکت",
      type: "text",
    },
    {
      name: "number_of_shares",
      label: "تعداد سهام",
      type: "number",
    },
    {
      name: "position",
      label: "موقعیت",
      type: "number",
    },
    {
      name: "price",
      label: "قیمت",
      type: "number",
    },
    {
      name: "document",
      label: "سند",
      type: "file",
      value: undefined,
    },
  ];

  const initialValues = {
    id: data?.id || 0,
    company: data?.company || 0,
    number_of_shares: data?.number_of_shares || 0,
    position: data?.position || 0,
    price: data?.price || 0,
    created_at: data?.created_at || "",
    updated_at: data?.updated_at || "",
    document: undefined,
  };

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    company: yup.number().required("شرکت الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    position: yup.number().required("موقعیت الزامی است"),
    price: yup.number().required("قیمت الزامی است"),
    document: yup.string().default("").nullable(),
    created_at: yup.string().required(),
    updated_at: yup.string().required(),
  }) as yup.ObjectSchema<CapitalIncreasePaymentTypes>;

  const onSubmit = (values: CapitalIncreasePaymentTypes) => {
    if (data?.id) {
      mutate(values, {
        onSuccess: () => {
          toast.success("سود پرداختی با موفقیت ویرایش شد");
          onClose();
        },
        onError: () => {
          toast.error("خطایی رخ داده است");
        },
      });
    }
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      colors="text-[#5677BC]"
      buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
      showCloseButton={true}
      onClose={onClose}
      onSubmit={onSubmit}
      submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
      title="ویرایش سود پرداختی"
    />
  );
};

export default EditCapitalForm;
