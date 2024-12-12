import toast, { Toaster } from "react-hot-toast";
import Forms from "../../../components/forms";
import useUpdateShareholders from "../hooks/useUpdateShareholders";
import { ShareholdersTypes } from "../types";
import * as yup from "yup";

interface EditShareholdFormProps {
  data: ShareholdersTypes | null;
  onClose: () => void;
}

const EditShareholdForm: React.FC<EditShareholdFormProps> = ({
  data,
  onClose,
}) => {
  const { mutate } = useUpdateShareholders();

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required("نام الزامی است"),
    number_of_shares: yup.number().required("سهام الزامی است"),
    company: yup.string().required("شرکت الزامی است"),
    created_at: yup.string().required(),
    updated_at: yup.string().required(),
  });

  const formFields = [
    {
      name: "name",
      label: "نام",
      type: "text",
    },
    {
      name: "number_of_shares",
      label: "سهام",
      type: "number",
    },
    {
      name: "company",
      label: "شرکت",
      type: "text",
    },
    {
      name: "created_at",
      label: "تاریخ ایجاد",
      type: "text",
      disabled: true,
    },
    {
      name: "updated_at",
      label: "تاریخ بروزرسانی",
      type: "text",
      disabled: true,
    },
  ];

  const initialValues = {
    name: data?.name || "",
    number_of_shares: data?.number_of_shares || 0,
    company: data?.company || "",
    created_at: data?.created_at || "",
    updated_at: data?.updated_at || "",
    id: data?.id || 0,
  };

  const onSubmit = (values: ShareholdersTypes) => {
    if (data?.id) {
      mutate(
        { id: data.id, data: values },
        {
          onSuccess: () => {
            toast.success("سهامدار با موفقیت ویرایش شد");
            onClose();
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
      <Toaster />
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
        title="ویرایش سهامدار"
      />
    </>
  );
};

export default EditShareholdForm;
