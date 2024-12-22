import toast, { Toaster } from "react-hot-toast";
import Forms from "../../../components/forms";
import useUpdateShareholders from "../hooks/useUpdateShareholders";
import { ShareholdersTypes } from "../types";
import * as yup from "yup";
import { useShareHoldersStore } from "../store";
import { useGetShareholders } from "../hooks";
import { useUserData } from "../../users/hooks";


const EditShareholdForm: React.FC = () => {
  const { mutate } = useUpdateShareholders();
  const { id } = useShareHoldersStore();

  const { data: shareholders } = useGetShareholders();
  const { data: users } = useUserData();


  const shareholder = shareholders?.find(
    (item: ShareholdersTypes) => item.id === id
  );

  const validationSchema = yup.object().shape({
    id: yup.number().required(),
    name: yup.string().required("نام الزامی است"),
    number_of_shares: yup.number().required("سهام الزامی است"),
    company: yup.number().required("شرکت الزامی است"),
    user: yup.number().required("کاربر الزامی است"),
    updated_at: yup.string().optional(),
    created_at: yup.string().optional(),
  });


  const formFields = [
    {
      name: "name",
      label: "نام",
      type: "text" as const,
    },
    {
      name: "number_of_shares",
      label: "سهام",
      type: "text" as const,
    },
    {
      name: "company",
      label: "شرکت",
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
    name: shareholder?.name || "",
    number_of_shares: shareholder?.number_of_shares || 0,
    company: shareholder?.company || "",
    user: shareholder?.user || 0,
    id: shareholder?.id || 0,
  };

  const onSubmit = (values: ShareholdersTypes) => {
    if (shareholder?.id) {
      mutate(
        { id: shareholder?.id, data: values },
        {
          onSuccess: () => {
            toast.success("سهامدار با موفقیت ویرایش شد");
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
      <Toaster />
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        showCloseButton={true}
        onSubmit={onSubmit}
        submitButtonText={{ default: "ثبت", loading: "در حال ثبت..." }}
        title="ویرایش سهامدار"
      />
    </>
  );
};

export default EditShareholdForm;
