import toast from "react-hot-toast";
import Forms from "../../../components/forms";
import { useGetPrecedence, useUpdatePrecendence } from "../hooks";
import * as yup from "yup";
import { PrecedenceTypes } from "../types";
import { usePrecendenceStore } from "../store";
import { useCompaniesData } from "../../companies/hooks";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../users/hooks";

const EditPrecendenceForm: React.FC = () => {
  const { mutate: updatePrecendence } = useUpdatePrecendence();
  const { id } = usePrecendenceStore();
  const { data } = useGetPrecedence();
  const precedence = data?.find((item: PrecedenceTypes) => item.id === id);
  const { data: users } = useUserData();

  const navigate = useNavigate();
  const { data: companies } = useCompaniesData();

  if (!precedence && !id) {
    navigate("/precendence/table");
  }

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    company: yup.number().required("شرکت الزامی است"),
    precedence: yup.number().required("حق تقدم الزامی است"),
    created_at: yup.string().optional(),
    updated_at: yup.string().optional(),
    user: yup.number().required("کاربر الزامی است"),
  });

  const formFields = [
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
      name: "precedence",
      label: "حق تقدم",
      type: "text" as const,
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
    company: precedence?.company.toString() || "",
    precedence: precedence?.precedence || 0,
    id: precedence?.id || 0,
    created_at: precedence?.created_at || "",
    updated_at: precedence?.updated_at || "",
    user: precedence?.user.toString() || "",
  };

  const onSubmit = (values: PrecedenceTypes) => {
    if (precedence?.id) {
      updatePrecendence(
        { id: precedence?.id, data: values },
        {
          onSuccess: () => {
            toast.success("سهامدار با موفقیت ویرایش شد");
            navigate("/precendence/table");
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
export default EditPrecendenceForm;
