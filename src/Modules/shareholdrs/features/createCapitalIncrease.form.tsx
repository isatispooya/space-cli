import Forms from "../../../components/forms";
import { useCompaniesData } from "../../companies/hooks";
import { useUserData } from "../../users/hooks";
import { usePostCapitalIncreasePayment } from "../hooks";
import * as Yup from "yup";
import { FormField } from "../../companies/types";

const CreateCapitalIncreaseForm = () => {
  const { mutate: postCapitalIncrease } = usePostCapitalIncreasePayment();
  const { data: companies } = useCompaniesData();
  const { data: users } = useUserData();

  console.log('Users data:', users);

  const formFields: FormField[] = [
    { name: "number_of_shares", label: "تعداد سهام", type: "text" as const },
    { name: "price", label: "قیمت", type: "text" as const },
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options:
        companies?.map((company: { name: string; id: number }) => ({
          label: company.name || '',
          value: company.id.toString(),
        })) || [],
    },
    {
      name: "user",
      label: "کاربر",
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
    company: "",
    number_of_shares: "",
    price: "",
    user: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("شرکت الزامی است"),
    number_of_shares: Yup.string()
      .required("تعداد سهام الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    price: Yup.string()
      .required("قیمت الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    user: Yup.string().required("کاربر الزامی است"),
  });

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ثبت  پرداخت افزایش سود"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت سود پرداختی",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          await postCapitalIncrease(values);
        } catch (error) {
          console.error("Error creating shareholder:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default CreateCapitalIncreaseForm;
