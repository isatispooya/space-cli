import { Forms } from "../../../components";
import * as Yup from "yup";
import { FormField } from "../../../types";
import { InvitationPostTypes } from "../types";
import { useInvitation } from "../hooks";
import toast from "react-hot-toast";

const InvitationCreateForm = () => {
  const { mutate: postInvitation } = useInvitation.useCreateCodes();
  const validationSchema = Yup.object().shape({
    description: Yup.string().required("توضیحات الزامی است"),
  });

  const formFields = [
    {
      name: "description",
      label: "توضیحات",
      type: "text",
    },
  ];

  const initialValues = {
    description: "",
  };

  return (
    <Forms
      formFields={formFields as unknown as FormField[]}
      initialValues={initialValues}
      validationSchema={validationSchema}
      title="ثبت کد فعال سازی"
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#008282]"
      submitButtonText={{
        default: "ثبت کد فعال سازی",
        loading: "در حال ارسال...",
      }}
      onSubmit={async (
        values: InvitationPostTypes,
        { setSubmitting, resetForm }
      ) => {
        try {
          await postInvitation(values, {
            onSuccess: () => {
              toast.success("کد فعال سازی با موفقیت ثبت شد");
              resetForm();
            },
            onError: () => {
              toast.error("خطایی رخ داده است");
            },
          });
        } catch (error) {
          console.error("Error creating shareholder:", error);
        } finally {
          setSubmitting(false);
        }
      }}
    />
  );
};

export default InvitationCreateForm;
