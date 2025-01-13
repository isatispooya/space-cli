import toast from "react-hot-toast";
import Forms from "../../../../components/forms";
import { usePrecendence } from "../../hooks";
import * as yup from "yup";
import { PrecedenceTypes } from "../../types";
import { useNavigate, useParams } from "react-router-dom";

const EditPrecendenceForm: React.FC = () => {
  const { mutate: updatePrecendence } = usePrecendence.useUpdate();
  const { id } = useParams();
  const { data } = usePrecendence.useGet();
  const precedence = data?.find((item: PrecedenceTypes) => item.id === Number(id));

  const navigate = useNavigate();

  console.log(precedence);
  

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
    used_precedence: yup.number().required("حق تقدم استفاده شده الزامی است"),
    company_detail: yup.object().optional(),
    user_detail: yup.object().optional(),
  }) as yup.ObjectSchema<PrecedenceTypes>;

  const formFields = [
    {
      name: "company",
      label: "شرکت",
      type: "select" as const,
      options: [{
        value: precedence?.company_detail?.id || '',
        label: precedence?.company_detail?.name || '',
      }],
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
      options: [{
        value: precedence?.user_detail?.id || '',
        label: `${precedence?.user_detail?.first_name || ''} ${precedence?.user_detail?.last_name || ''} `
      }]
    },
  ];

  const initialValues: PrecedenceTypes = {
    company: parseInt(precedence?.company.toString() || "0"),
    precedence: precedence?.precedence || 0,
    id: precedence?.id || 0,
    updated_at: precedence?.updated_at || "",
    user: parseInt(precedence?.user.toString() || "0"),
    used_precedence: precedence?.used_precedence || 0,
  };

  const onSubmit = (values: PrecedenceTypes) => {
    if (precedence?.id) {
      updatePrecendence(
        { id: precedence?.id.toString(), data: values },
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
