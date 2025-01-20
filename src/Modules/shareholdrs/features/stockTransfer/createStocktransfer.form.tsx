import Forms from "../../../../components/forms";
import { useStockTransfer } from "../../hooks";
import * as Yup from "yup";
import { FormField } from "../../../../types";
import { useCompany } from "../../../companies/hooks";
import { useUserData } from "../../../users/hooks";
import toast from "react-hot-toast";

const CreateStocktransferForm = () => {
  const { mutate: postStocktransfer } = useStockTransfer.useCreate();

  const { data: companies } = useCompany.useGet();

  const { data: users } = useUserData();

  const formFields: FormField[] = [
    { name: "number_of_shares", label: "تعداد سهام", type: "text" as const },
    {
      name: "seller",
      label: "فروشنده",
      type: "select" as const,
      options:
        users?.map(
          (user: { first_name: string; last_name: string; id: number; uniqueIdentifier: string }) => ({
            label: `${user.first_name} ${user.last_name} | ${user.uniqueIdentifier}`,
            value: user.id.toString(),
          })
        ) || [],
    },
    {
      name: "buyer",
      label: "خریدار",
      type: "select" as const,
      options:
        users?.map(
          (user: { first_name: string; last_name: string; id: number; uniqueIdentifier: string }) => ({
            label: `${user.first_name} ${user.last_name} | ${user.uniqueIdentifier}`,
            value: user.id.toString(),
          })
        ) || [],
    },

    { name: "price", label: "قیمت", type: "text" as const },
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options:
        companies?.map((company: { name: string; id: number }) => ({
          label: company.name || "",
          value: company.id.toString(),
        })) || [],
    },
  ];
  const initialValues = {
    buyer: "",
    seller: "",
    number_of_shares: "",
    price: "",
    document: null as string | null,
    company: "",
  };
  const validationSchema = Yup.object().shape({
    buyer: Yup.string().required("خریدار الزامی است"),
    seller: Yup.string().required("فروشنده الزامی است"),
    number_of_shares: Yup.string()
      .required("تعداد سهام الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    price: Yup.string()
      .required("قیمت الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    document: Yup.string()
      .transform((value) => value || null)
      .nullable(),
    company: Yup.string().required("شرکت الزامی است"),
  });
  return (
    <>
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        title="ثبت انتقال سهام"
        colors="text-[#29D2C7]"
        buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
        submitButtonText={{
          default: "ثبت انتقال سهام",
          loading: "در حال ارسال...",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            const submitData = {
              ...values,
              buyer: Number(values.buyer),
              seller: Number(values.seller),
              number_of_shares: Number(values.number_of_shares),
              price: Number(values.price),
              company: Number(values.company),
              document: values.document || null,
              id: 0,
              user: 0,
            };
            await postStocktransfer(submitData, {
              onSuccess: () => {
                toast.success("انتقال سهام با موفقیت ثبت شد");
                resetForm();
              },
              onError: () => {
                toast.error("تعداد سهام مجاز نیست");
              },
            });
          } catch (error) {
            console.error("Error creating shareholder:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      />
    </>
  );
};

export default CreateStocktransferForm;
