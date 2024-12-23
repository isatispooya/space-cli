import toast, { Toaster } from "react-hot-toast";
import Forms from "../../../components/forms";
import { DisplacementPrecendenceTypes } from "../types";
import * as yup from "yup";
import { useGetDisplacementPrecendence, useUpdateDisplacment } from "../hooks";
import { useDisplacementStore } from "../store";

const EditDisplacmentForm: React.FC = () => {
  const { mutate } = useUpdateDisplacment();

  const { data: displacementData } = useGetDisplacementPrecendence();

  const { id } = useDisplacementStore();

  const displacement = displacementData?.find(
    (item: DisplacementPrecendenceTypes) => item.id === id
  );

  const formFields = [
    {
      name: "buyer",
      label: "خریدار",
      type: "text" as const,
    },
    {
      name: "seller",
      label: "فروشنده",
      type: "text" as const,
    },
    {
      name: "company",
      label: "شرکت",
      type: "text" as const,
    },
    {
      name: "number_of_shares",
      label: "تعداد سهام",
      type: "text" as const,
    },
    {
      name: "price",
      label: "قیمت",
      type: "text" as const,
    },
    {
      name: "document",
      label: "سند",
      type: "text" as const,
    },
  ];

  const initialValues = {
    id: displacement?.id || 0,
    buyer: displacement?.buyer || 0,
    seller: displacement?.seller || 0,
    company: displacement?.company || 0,
    number_of_shares: displacement?.number_of_shares || 0,
    price: displacement?.price || 0,
    document: undefined,
  };

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    buyer: yup.number().required("خریدار الزامی است"),
    seller: yup.number().required("فروشنده الزامی است"),
    company: yup.number().required("شرکت الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    price: yup.number().required("قیمت الزامی است"),
    document: yup.string().nullable(),
  }) as yup.ObjectSchema<DisplacementPrecendenceTypes>;

  const onSubmit = (values: DisplacementPrecendenceTypes) => {
    if (displacement?.id) {
      mutate(
        { data: values, id: displacement?.id },
        {
          onSuccess: () => {
            toast.success("حق تقدم با موفقیت ویرایش شد");
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
        title="ویرایش حق تقدم"
      />
    </>
  );
};

export default EditDisplacmentForm;
