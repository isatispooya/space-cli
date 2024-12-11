import Forms from "../../../components/forms";
import * as yup from "yup";
import { PermissionData } from "../types";
import { useUserData } from "../../users/hooks";
import { useSetPermission } from "../hooks";

interface FormValues {
  user_id: number;
  permission_id: number[];
}

const EditPermissionForm: React.FC<{
  data: PermissionData;
  onClose: () => void;
}> = ({ data, onClose }) => {
  const { data: users } = useUserData();

  console.log(users);

  const { mutate: setPermission } = useSetPermission();

  const formFields = [
    {
      name: "user_id",
      label: "شناسه کاربر ",
      type: "number",
    },
    {
      name: "permission_id",
      label: "شناسه دسترسی",
      type: "number",
      inputMode: "numeric",
    },
  ];

  const initialValues = {
    user_id: users?.id || 0,
    permission_id: [data?.id || 0],
  };

  const validationSchema = yup.object({
    user_id: yup.number().required("شناسه کاربر الزامی است"),
    permission_id: yup
      .array()
      .of(yup.number())
      .required("شناسه دسترسی الزامی است"),
  });

  const onSubmit = (values: FormValues) => {
    const transformedValues = {
      user_id: values.user_id,
      permission_id: Array.isArray(values.permission_id)
        ? values.permission_id
        : [values.permission_id],
    };
    setPermission(transformedValues);
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
