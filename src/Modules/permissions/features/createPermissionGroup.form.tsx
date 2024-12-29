import Forms from "../../../components/forms";
import { usePostGroups, usePermissionList } from "../hooks";
import { CreatePermissionData } from "../types";
import * as Yup from "yup";
import TransferList from "../../../components/transferList";
import { useState } from "react";
import { FormField } from "../../companies/types";

interface Permission {
  id: number;
  name: string;
  codename: string;
}

const CreatePermissionGroupForm = () => {
  const { data: permissions = [], isLoading } = usePermissionList();
  const [selectedPermissions, setSelectedPermissions] = useState<Permission[]>(
    []
  );

  const validationSchema = Yup.object({
    groups: Yup.array().required("گروه الزامی است"),
    name: Yup.string().required("نام الزامی است"),
  }) as Yup.ObjectSchema<CreatePermissionData>;

  const initialValues: CreatePermissionData = {
    groups: [],
    name: "",
    ids: [],
    user_id: 0,
  };

  const formFields: FormField[] = [
    { name: "name", label: "نام", type: "text" as const },
  ];

  const { mutate: createPermissionGroup } = usePostGroups();

  const handleTransferChange = (_left: Permission[], right: Permission[]) => {
    setSelectedPermissions(right);
  };

  const onSubmit = (values: CreatePermissionData) => {
    const submissionData = {
      ...values,
      groups: selectedPermissions,
      ids: selectedPermissions.map((permission) => permission.id),
    };

    createPermissionGroup(submissionData);
  };

  if (isLoading) {
    return <div>Loading permissions...</div>;
  }

  return (
    <>
      <TransferList
        leftTitle="دسترسی های موجود"
        rightTitle="دسترسی های انتخاب شده"
        leftItems={permissions.map((permission) => ({
          id: permission.id,
          name: permission.name,
          codename: permission.codename,
        }))}
        rightItems={selectedPermissions}
        onChange={handleTransferChange}
        searchPlaceholder="جستجوی دسترسی..."
      />
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        title="ایجاد گروه دسترسی"
        submitButtonText={{
          default: "ایجاد گروه دسترسی",
          loading: "در حال ایجاد...",
        }}
        colors="text-secondary-500"
        buttonColors="bg-secondary-500 hover:bg-secondary-600"
      />
    </>
  );
};

export default CreatePermissionGroupForm;
