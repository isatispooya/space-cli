import Forms from "../../../components/forms";
import * as yup from "yup";
import { PermissionData } from "../types/permissionData";
import { useUserData } from "../../users/hooks";
import { useSetPermission } from "../hooks";
import { useParams } from "react-router-dom";
import { FormField } from "../../../types";

interface FormValues {
  user_id: number;
  permission_id: number[];
}

interface EditPermissionFormProps {
  data?: PermissionData;
  onClose?: () => void;
}

const EditPermissionForm: React.FC<EditPermissionFormProps> = () => {
  const { data: users } = useUserData();
  const { mutate: setPermission } = useSetPermission();
  const { id } = useParams<{ id: string }>();
  const specificUser = users?.find(
    (user: { id: number }) => user.id === Number(id)
  );

  console.log("specificUser", specificUser);

  const formFields: FormField[] = [
    {
      name: "user_id",
      label: "شناسه کاربر ",
      type: "text",
    },
    {
      name: "user",
      label: "کاربر",
      type: "select",
      options: users?.map(
        (user: {
          id: number;
          first_name: string;
          last_name: string;
          uniqueIdentifier: string;
        }) => ({
          value: user.id.toString(),
          label: `${user.first_name || ""} ${user.last_name || ""} | ${
            user.uniqueIdentifier || ""
          }`,
        })
      ),
    },
  ];

  const initialValues: FormValues = {
    user_id: specificUser?.id || 0,
    permission_id: specificUser?.id ? [specificUser.id] : [],
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
        name: specificUser?.first_name || "",
      },
    });
  };

  return (
    <Forms
      formFields={formFields as FormField[]}
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
