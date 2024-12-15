import Forms from "../../../components/forms";
import * as Yup from "yup";
import { CreatePermissionData } from "../types";
import { useCreatePermission } from "../hooks/permissionPost";
import { usePermissionList } from "../hooks";

const validationSchema = Yup.object({
  groups: Yup.array().required("گروه الزامی است"),
  user_id: Yup.number().required("کاربر الزامی است"),
}) as Yup.ObjectSchema<CreatePermissionData>;

const initialValues: CreatePermissionData = {
  groups: [],
  user_id: 0,
};

const formFields = [
  { name: "groups", label: "گروه", type: "select" },
  { name: "user_id", label: "کاربر", type: "text" },
];

export const CreatePermissionsForm: React.FC = () => {
  const { mutate } = useCreatePermission();
  const { data } = usePermissionList();

  const onSubmit = (values: CreatePermissionData) => {
    mutate(values);
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      title="ایجاد دسترسی"
      submitButtonText={{
        default: "ایجاد دسترسی",
        loading: "در حال ایجاد...",
      }}
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
    />
  );
};

export default CreatePermissionsForm;
