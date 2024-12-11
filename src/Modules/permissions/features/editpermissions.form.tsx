import Forms from "../../../components/forms";
import * as yup from "yup";
import { PermissionData } from "../types";

interface FormValues {
  name: string;
}

const EditPermissionForm: React.FC<{
  data: PermissionData;
  onClose: () => void;
}> = ({ data, onClose }) => {
  const formFields = [
    {
      name: "name",
      label: "نام",
      type: "text",
    },
  ];

  const initialValues = {
    name: "",
    id: 0,
  };

  const validationSchema = yup.object({
    name: yup.string().required("نام الزامی است"),
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };
  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      submitButtonText={{ default: "ویرایش", loading: "ویرایش" }}
      title="ویرایش"
      colors="text-[#5677BC]"
      buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
      showCloseButton={true}
      onClose={onClose}
    />
  );
};

export default EditPermissionForm;
