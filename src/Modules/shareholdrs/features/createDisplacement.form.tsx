import Forms from "../../../components/forms";
import { useCompaniesData } from "../../companies/hooks";
import { useUserData } from "../../users/hooks";
import { usePostDisplacementPrecendence } from "../hooks";
import * as Yup from "yup";
import { FormField } from "../../companies/types";
import toast from "react-hot-toast";

const CreateDisplacementForm = () => {
  const { mutate: postDisplacement } = usePostDisplacementPrecendence();
  const { data: users } = useUserData();
  const { data: companies } = useCompaniesData();

  const formFields: FormField[] = [
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
    { name: "number_of_shares", label: "تعداد حق تقدم", type: "text" as const },
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
    company: "",
    number_of_shares: "",
    price: "",
  };

  const validationSchema = Yup.object().shape({
    buyer: Yup.string().required("خریدار الزامی است"),
    seller: Yup.string().required("فروشنده الزامی است"),
    company: Yup.string().required("شرکت الزامی است"),
    number_of_shares: Yup.string()
      .required("تعداد سهام الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    price: Yup.string()
      .required("قیمت الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
  });

  return (
    <>
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        title="ثبت نقل و نتقال حق تقدم"
        colors="text-[#29D2C7]"
        buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
        submitButtonText={{
          default: "ثبت حق تقدم",
          loading: "در حال ارسال...",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            await postDisplacement(
              {
                ...values,
                buyer: Number(values.buyer),
                seller: Number(values.seller),
                company: Number(values.company),
                number_of_shares: Number(values.number_of_shares),
                price: Number(values.price),
                id: 0,
                document: null,
              },
              {
                onSuccess: () => {
                  toast.success("با موفقیت ثبت شد");
                  resetForm();
                },
                onError: (error) => {
                  toast.error(error.message);
                },
              }
            );
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

export default CreateDisplacementForm;
