import toast, { Toaster } from "react-hot-toast";
import Forms from "../../../components/forms";
import { DisplacementPrecendenceTypes } from "../types";
import * as yup from "yup";
import { useUpdateDisplacment } from "../hooks";

interface propTypes {
  data: DisplacementPrecendenceTypes | null;
  onClose: () => void;
}

const EditDisplacmentForm: React.FC<propTypes> = ({ data, onClose }) => {

    const { mutate } = useUpdateDisplacment();

    console.log(data);

  const formFields = [
    {
      name: "buyer",
      label: "خریدار",
      type: "number",
    },
    {
      name: "seller",
      label: "فروشنده",
      type: "number",
    },
    {
      name: "company",
      label: "شرکت",
      type: "number",
    },
    {
      name: "number_of_shares",
      label: "تعداد سهام",
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
    },

  ];

  const initialValues = {
    id: data?.id || 0,
    buyer: data?.buyer || 0,
    seller: data?.seller || 0,
    company: data?.company || 0,
    number_of_shares: data?.number_of_shares || 0,
    price: data?.price || 0,
    document: undefined,
    created_at: data?.created_at || "",
    updated_at: data?.updated_at || "",
  };

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    buyer: yup.number().required("خریدار الزامی است"),
    seller: yup.number().required("فروشنده الزامی است"),
    company: yup.number().required("شرکت الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    price: yup.number().required("قیمت الزامی است"),
    document: yup.string().nullable(),
    created_at: yup.string().required(),
    updated_at: yup.string().required(),
  }) as yup.ObjectSchema<DisplacementPrecendenceTypes>;

  const onSubmit = (values: DisplacementPrecendenceTypes) => {
    if (data?.id) {
      mutate({ data: values, id: data.id }, {
        onSuccess: () => {
          toast.success("حق تقدم با موفقیت ویرایش شد");
          onClose();
        },
      });
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
        title="ویرایش حق تقدم"
      />
    </>
  );
};

export default EditDisplacmentForm;
