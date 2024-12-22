import toast, { Toaster } from "react-hot-toast";
import Forms from "../../../components/forms";
import { useGetPrecedence, useUpdatePrecendence } from "../hooks";
import * as yup from "yup";
import { PrecedenceTypes } from "../types";
import { usePrecendenceStore } from "../store";

const EditPrecendenceForm: React.FC = () => {
  const { mutate: updatePrecendence } = useUpdatePrecendence();
  const { id } = usePrecendenceStore();
  const { data } = useGetPrecedence();
  const precedence = data?.find((item: PrecedenceTypes) => item.id === id);

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    company: yup.number().required("شرکت الزامی است"),
    position: yup.number().required("موقعیت الزامی است"),
    precedence: yup.number().required("حق تقدم الزامی است"),
    used_precedence: yup.number().required("حق تقدم استفاده شده الزامی است"),
    created_at: yup.string().optional(),
    updated_at: yup.string().optional(),
    user: yup.number().required("کاربر الزامی است"),
  });

  const formFields = [
    {
      name: "company",
      label: "شرکت",
      type: "text" as const,
    },
    {
      name: "position",
      label: "موقعیت",
      type: "text" as const,
    },
    {
      name: "precedence",
      label: "حق تقدم",
      type: "text" as const,
    },
    {
      name: "used_precedence",
      label: "حق تقدم استفاده شده",
      type: "text" as const,
    },
  ];

  const initialValues = {
    company: precedence?.company || 0,
    position: precedence?.position || 0,
    precedence: precedence?.precedence || 0,
    used_precedence: precedence?.used_precedence || 0,
    id: precedence?.id || 0,
    created_at: precedence?.created_at || "",
    updated_at: precedence?.updated_at || "",
    user: precedence?.user || 0,
  };

  const onSubmit = (values: PrecedenceTypes) => {
    if (precedence?.id) {
      updatePrecendence(
        { id: precedence?.id, data: values },
        {
          onSuccess: () => {
            toast.success("سهامدار با موفقیت ویرایش شد");
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
        onSubmit={onSubmit}
        submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
        title="ویرایش سهامدار"
      />
    </>
  );
};
export default EditPrecendenceForm;
