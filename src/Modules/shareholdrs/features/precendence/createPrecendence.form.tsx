import Forms from "../../../../components/forms";
import { usePrecendence } from "../../hooks";
import * as Yup from "yup";
import { FormField } from "../../../companies/types";
import { useUserData } from "../../../users/hooks";
import { useCompany } from "../../../companies/hooks";
import toast from "react-hot-toast";

const CreatePrecendenceForm = () => {
  const { mutate: postPrecendence } = usePrecendence.useCreate();

  const { data: users } = useUserData();

  const { data: companies } = useCompany.useGet();

  const formFields: FormField[] = [
    { name: "precedence", label: "حق تقدم", type: "text" as const },
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
    {
      name: "user",
      label: "کاربر",
      type: "select" as const,
      options:
        users?.map(
          (user: { first_name: string; last_name: string; id: number; uniqueIdentifier: string }) => ({
            label: `${user.first_name} ${user.last_name} | ${user.uniqueIdentifier}`,
            value: user.id.toString(),
          })
        ) || [],
    },
  ];

  const initialValues = {
    company: "",
    precedence: "",
    user: "",
  };

  const validationSchema = Yup.object().shape({
    company: Yup.string().required("شرکت الزامی است"),
    precedence: Yup.string()
      .required("حق تقدم الزامی است")
      .matches(/^\d+$/, "فقط عدد مجاز است"),
    user: Yup.string().required("کاربر الزامی است"),
  });

  return (
    <>
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        title="ثبت حق تقدم"
        colors="text-[#29D2C7]"
        buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
        submitButtonText={{
          default: "ثبت حق تقدم",
          loading: "در حال ارسال...",
        }}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          try {
            postPrecendence(
              {
                ...values,
                company: Number(values.company),
                precedence: Number(values.precedence),
                user: Number(values.user),
                id: 0,
                used_precedence: 0,
                total_amount: 0,
                updated_at: new Date().toISOString()
              },
              {
                onSuccess: () => {
                  toast.success("حق تقدم با موفقیت ثبت شد");
                  resetForm();
                },
                onError: (error) => {
                  toast.error("خطایی رخ داده است");
                  console.error("Error creating shareholder:", error);
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

export default CreatePrecendenceForm;
