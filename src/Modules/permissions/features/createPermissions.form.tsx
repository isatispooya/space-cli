import { Forms } from "../../../components";
import * as Yup from "yup";
import { CreatePermissionDataType } from "../types";
import { useCreatePermission } from "../hooks/permissionPost";
import { FormFieldType } from "../../../types";

const validationSchema = Yup.object({
  groups: Yup.array().required("گروه الزامی است"),
  user_id: Yup.number().required("کاربر الزامی است"),
}) as Yup.ObjectSchema<CreatePermissionDataType>;

const initialValues: CreatePermissionDataType = {
  groups: [],
  user_id: 0,
  ids: [],
  name: "",
};

const formFields: FormFieldType[] = [
  { name: "groups", label: "گروه", type: "select" as const },
  { name: "user_id", label: "کاربر", type: "text" as const },
];

export const CreatePermissionsForm: React.FC = () => {
  const { mutate } = useCreatePermission();
  

  const onSubmit = (values: CreatePermissionDataType) => {
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
