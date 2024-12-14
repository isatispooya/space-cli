import toast, { Toaster } from "react-hot-toast";
import Forms from "../../../components/forms";
import { StockTransferTypes } from "../types";
import useUpdateStockTransfer from "../hooks/useUpdateStockTransfer";
import * as yup from "yup";

interface propTypes {
  data: StockTransferTypes | null;
  onClose: () => void;
}
const EditStockTransferForm: React.FC<propTypes> = ({ data, onClose }) => {
  const { mutate } = useUpdateStockTransfer();



  const validationSchema = yup.object<StockTransferTypes>().shape({
    id: yup.number().required(),
    buyer: yup.number().required("خریدار الزامی است"),
    seller: yup.number().required("فروشنده الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    price: yup.number().required("قیمت الزامی است"),
    created_at: yup.string().required(),
    updated_at: yup.string().required(),
    document: yup.mixed().nullable().default(null),
  });

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
    buyer: data?.buyer || 0,
    seller: data?.seller || 0,
    number_of_shares: data?.number_of_shares || 0,
    price: data?.price || 0,
    created_at: data?.created_at || "",
    updated_at: data?.updated_at || "",
    document: data?.document || null,
    id: data?.id || 0,
  };

  const onSubmit = (values: StockTransferTypes) => {
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
        submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        showCloseButton={true}
        onClose={onClose}
        onSubmit={onSubmit}
        
        title="ویرایش جابهجایی سهام"
      />
    </>
  );
};

export default EditStockTransferForm;
