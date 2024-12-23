import toast from "react-hot-toast";
import Forms from "../../../components/forms";
import { StockTransferTypes } from "../types";
import useUpdateStockTransfer from "../hooks/useUpdateStockTransfer";
import * as yup from "yup";
import { useGetStockTransfer } from "../hooks";
import { useStockTransferStore } from "../store";
import { useUserData } from "../../users/hooks";
import { useCompaniesData } from "../../companies/hooks";
import { useNavigate } from "react-router-dom";

const EditStockTransferForm: React.FC = () => {
  const { mutate } = useUpdateStockTransfer();
  const { data: stockTransferData } = useGetStockTransfer();
  const { data: users } = useUserData();
  const { data: companies } = useCompaniesData();
  const navigate = useNavigate();
  const { id } = useStockTransferStore();

  const stockTransfer = stockTransferData?.find(
    (item: StockTransferTypes) => item.id === id
  );

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    buyer: yup.number().required("خریدار الزامی است"),
    seller: yup.number().required("فروشنده الزامی است"),
    number_of_shares: yup.number().required("تعداد سهام الزامی است"),
    price: yup.number().required("قیمت الزامی است"),
  }) as yup.ObjectSchema<StockTransferTypes>;

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

  const initialValues = {
    buyer: stockTransfer?.buyer?.toString() || "",
    seller: stockTransfer?.seller?.toString() || "",
    number_of_shares: stockTransfer?.number_of_shares || 0,
    company: stockTransfer?.company?.toString() || "",
    price: stockTransfer?.price || 0,
    document: stockTransfer?.document || null,
    id: stockTransferData?.id || 0,
    user: stockTransferData?.user || 0,
  };

  if (!stockTransfer && !id) {
    navigate("/transferstock/table");
  }
  const onSubmit = (values: StockTransferTypes) => {
    if (stockTransfer?.id) {
      mutate(
        { id: stockTransfer?.id, data: values },
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
