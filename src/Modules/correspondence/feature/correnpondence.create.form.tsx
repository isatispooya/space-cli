import Forms from "../../../components/forms";
import * as Yup from "yup";
import { CorrespondencePostType, CorrespondenceTypes } from "../types";
import { FormikHelpers } from "formik";
import { useCorrespondences } from "../hooks";

const validationSchema = Yup.object().shape({
  sender: Yup.string().required("لطفا فرستنده را وارد کنید"),
  subject: Yup.string().required("لطفا موضوع را وارد کنید"),
  text: Yup.string().required("لطفا متن مکاتبه را وارد کنید"),
  receiver_internal: Yup.string(),
  receiver_external: Yup.string(),
  kind_of_correspondence: Yup.string(),
  confidentiality_level: Yup.string(),
  priority: Yup.string(),
  authority_type: Yup.string(),
  reference: Yup.array(),
  is_internal: Yup.boolean(),
  binding: Yup.boolean(),
  draft: Yup.boolean(),
  published: Yup.boolean(),
  attachments: Yup.array(),
  authority_correspondence: Yup.mixed().nullable(),
  letterhead: Yup.string(),
  number: Yup.string(),
  seal: Yup.string(),
  uuid: Yup.string(),
  id: Yup.number(),
  created_at: Yup.string(),
  seal_placement: Yup.boolean(),
  signature: Yup.string(),
  signature_placement: Yup.boolean(),
});

const initialValues: CorrespondenceTypes = {
  sender: "",
  receiver_internal: "",
  receiver_external: "",
  subject: "",
  kind_of_correspondence: "request",
  confidentiality_level: "normal",
  priority: "normal",
  authority_type: "new",
  reference: [],
  text: "",
  is_internal: false,
  binding: false,
  draft: true,
  published: false,
  attachments: [],
  authority_correspondence: null,
  letterhead: "",
  number: "",
  seal: "",
  uuid: "",
  id: 0,
  created_at: "",
  seal_placement: false,
  signature: "",
  signature_placement: false,
};

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
  options?: { value: string; label: string }[];
}

const formFields: FormField[] = [
  { name: "sender", label: "فرستنده", type: "text" },
  { name: "receiver_internal", label: "گیرنده داخلی", type: "text" },
  { name: "receiver_external", label: "گیرنده خارجی", type: "text" },
  { name: "subject", label: "موضوع", type: "text" },
  {
    name: "kind_of_correspondence",
    label: "نوع مکاتبه",
    type: "select",
    options: [
      { value: "request", label: "درخواست" },
      { value: "response", label: "پاسخ" },
      { value: "letter", label: "نامه" },
    ],
  },
  {
    name: "confidentiality_level",
    label: "سطح محرمانگی",
    type: "select",
    options: [
      { value: "normal", label: "عادی" },
      { value: "confidential", label: "محرمانه" },
      { value: "secret", label: "سری" },
    ],
  },
];

interface CreateCorrespondenceFormProps {
  onSubmit?: (
    values: CorrespondenceTypes,
    actions: FormikHelpers<CorrespondenceTypes>
  ) => void;
  loading?: boolean;
}

export const CreateCorrespondenceForm: React.FC<
  CreateCorrespondenceFormProps
> = ({ onSubmit = () => {} }) => {
  const { mutate } = useCorrespondences.useCreate();

  const handleSubmit = async (
    values: CorrespondenceTypes,
    actions: FormikHelpers<CorrespondenceTypes>
  ) => {
    const postData: CorrespondencePostType = {
      sender: values.sender,
      receiver_internal: values.receiver_internal,
      receiver_external: values.receiver_external,
      subject: values.subject,
      kind_of_correspondence: values.kind_of_correspondence as
        | "request"
        | "response"
        | "letter",
      confidentiality_level: values.confidentiality_level as
        | "normal"
        | "confidential"
        | "secret",
    };

    try {
      await mutate(postData);
      onSubmit(values, actions);
    } catch (error) {
      console.error("Error posting data:", error);
      actions.setSubmitting(false);
    }
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={
        validationSchema as Yup.ObjectSchema<CorrespondenceTypes>
      }
      onSubmit={handleSubmit}
      title="ایجاد مکاتبه"
      submitButtonText={{
        default: "ایجاد مکاتبه",
        loading: "در حال ایجاد...",
      }}
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
    />
  );
};

export default CreateCorrespondenceForm;
