import toast from "react-hot-toast";
import { Forms } from "../../../../components";
import { stockTransferTypes } from "../../types/stockTransfer.type";
import * as yup from "yup";
import { useStockTransfer } from "../../hooks";
import { useStockTransferStore } from "../../store";
import { useUserData } from "../../../users/hooks";
import { useCompany } from "../../../companies/hooks";
import { useNavigate } from "react-router-dom";

const EditStockTransferForm: React.FC = () => {
  const { mutate } = useStockTransfer.useUpdate();
  const { data: stockTransferData } = useStockTransfer.useGet();
  const { data: users } = useUserData();
  const { data: companies } = useCompany.useGet();
  const navigate = useNavigate();
  const { id } = useStockTransferStore();

  const stockTransfer = stockTransferData?.find(
    (item: stockTransferTypes) => item.id === id
  );

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    buyer: yup.number().required("خریدار الزامی است"),
    seller: yup.number().required("فروشنده الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    price: yup.number().required("قیمت الزامی است"),
  }) as yup.ObjectSchema<stockTransferTypes>;

  const formFields = [
    {
      name: "number_of_shares",
      label: "تعداد سهام",
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
      name: "price",
      label: "قیمت",
      type: "text" as const,
    },
    {
      name: "buyer",
      label: "خریدار",
      type: "select" as const,
      options:
        users?.map(
          (user: { first_name: string; last_name: string; id: number }) => ({
            label: `${user.first_name} ${user.last_name}`,
            value: user.id.toString(),
          })
        ) || [],
    },
    {
      name: "seller",
      label: "فروشنده",
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

  const initialValues: stockTransferTypes = {
    buyer: parseInt(stockTransfer?.buyer?.toString() || "0"),
    seller: parseInt(stockTransfer?.seller?.toString() || "0"),
    number_of_shares: stockTransfer?.number_of_shares || 0,
    company: parseInt(stockTransfer?.company?.toString() || "0"),
    price: stockTransfer?.price || 0,
    document: stockTransfer?.document || null,
    id: stockTransfer?.id || 0,
    user: stockTransfer?.user || 0,
  };

  if (!stockTransfer && !id) {
    navigate("/transferstock/table");
  }
  const onSubmit = (values: stockTransferTypes) => {
    if (stockTransfer?.id) {
      mutate(
        { id: stockTransfer?.id.toString(), data: values },
        {
          onSuccess: () => {
            toast.success("سهامدار با موفقیت ویرایش شد");
            navigate("/transferstock/table");
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
        submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        showCloseButton={true}
        onSubmit={onSubmit}
        title="ویرایش جابهجایی سهام"
      />
    </>
  );
};

export default EditStockTransferForm;
