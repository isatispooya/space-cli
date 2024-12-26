import Forms from "../../../components/forms";
import * as yup from "yup";
import { PermissionData } from "../types/permissionData";
import { useUserData } from "../../users/hooks";
import { useSetPermission } from "../hooks";

interface FormValues {
  user_id: number;
  permission_id: number[];
}

type FormFieldType =
  | "text"
  | "select"
  | "email"
  | "password"
  | "checkbox"
  | "transferList";

interface FormField {
  name: string;
  label: string;
  type: FormFieldType;
  multiple?: boolean;
  inputMode?: string;
}

const EditPermissionForm: React.FC<{
  data?: PermissionData;
  onClose: () => void;
}> = ({ data, onClose }) => {
  const { data: users } = useUserData();
  const { mutate: setPermission } = useSetPermission();

  const formFields: FormField[] = [
    {
      name: "user_id",
      label: "شناسه کاربر ",
      type: "text",
    },
    {
      name: "permission_id",
      label: "شناسه دسترسی",
      type: "select",
      multiple: true,
      inputMode: "numeric",
    },
  ];

  const initialValues = {
    user_id: users?.id || 0,
    permission_id: data?.id ? [data.id] : [],
  };

  const validationSchema = yup.object({
    user_id: yup.number().required("شناسه کاربر الزامی است"),
    permission_id: yup
      .array()
      .of(yup.number().required())
      .required("شناسه دسترسی الزامی است")
      .min(1, "حداقل یک دسترسی باید انتخاب شود")
      .transform((value) =>
        value.filter((v: unknown): v is number => typeof v === "number")
      ),
  });

  const onSubmit = (values: FormValues) => {
    setPermission({
      id: values.user_id,
      data: {
        groups: [],
        ids: values.permission_id,
        user_id: values.user_id,
        name: "",
      },
    });
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      submitButtonText={{ default: "ویرایش", loading: "ویرایش" }}
      title="ویرایش دسترسی"
      colors="text-[#5677BC]"
      buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
    />
  );
};

export default EditPermissionForm;
