import toast, { Toaster } from "react-hot-toast";
import Forms from "../../../components/forms";
import { useUpdatePrecendence } from "../hooks";
import * as yup from "yup";
import { PrecedenceTypes } from "../types";

interface EditPrecendenceFormProps {
  data: PrecedenceTypes | null;
  onClose: () => void;
}

const EditPrecendenceForm: React.FC<EditPrecendenceFormProps> = ({
  data,
  onClose,
}) => {
  const { mutate: updatePrecendence } = useUpdatePrecendence();

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    company: yup.number().required("شرکت الزامی است"),
    position: yup.number().required("موقعیت الزامی است"),
    precedence: yup.number().required("حق تقدم الزامی است"),
    used_precedence: yup.number().required("حق تقدم استفاده شده الزامی است"),
    created_at: yup.string().required(),
    updated_at: yup.string().required(),
  });

  const formFields = [
    {
      name: "company",
      label: "شرکت",
      type: "number",
    },
    {
      name: "position",
      label: "موقعیت",
      type: "number",
    },
    {
      name: "precedence",
      label: "حق تقدم",
      type: "number",
    },
    {
      name: "used_precedence",
      label: "حق تقدم استفاده شده",
      type: "number",
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
    company: data?.company || 0,
    position: data?.position || 0,
    precedence: data?.precedence || 0,
    used_precedence: data?.used_precedence || 0,
    created_at: data?.created_at || "",
    updated_at: data?.updated_at || "",
    id: data?.id || 0,
  };

  const onSubmit = (values: PrecedenceTypes) => {
    if (data?.id) {
      updatePrecendence(
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
export default EditPrecendenceForm;
