import * as Yup from "yup";
import Forms from "../../../components/forms";
import { useUpdateCorrespondence } from "../hooks/useUpdateCorrespondence";
import { CorrespondenceTypes } from "../types";
import toast from "react-hot-toast";

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("موضوع الزامی است"),
  description: Yup.string().required("توضیحات الزامی است"),
  kind_of_correspondence: Yup.string().required("نوع مکاتبه الزامی است"),
  priority: Yup.string().required("اولویت الزامی است"),
  confidentiality_level: Yup.string().required("سطح محرمانگی الزامی است"),
  id: Yup.number().optional(),
  uuid: Yup.string().optional(),
  sender: Yup.mixed().optional(),
  receiver_internal: Yup.mixed().optional(),
  text: Yup.string().optional(),
  postcript: Yup.string().optional(),
  is_internal: Yup.boolean().optional(),
  binding: Yup.boolean().optional(),
  draft: Yup.boolean().optional(),
  published: Yup.boolean().optional(),
  attachments: Yup.array().optional(),
}) as Yup.ObjectSchema<CorrespondenceTypes>;





const formFields: FormField[] = [
  { name: "subject", label: "موضوع", type: "text" },
  { name: "description", label: "توضیحات", type: "textarea" },
  { name: "text", label: "متن مکاتبه", type: "textarea" },
  { name: "postcript", label: "پی نوشت", type: "textarea" },

  {
    name: "is_internal",
    label: "مکاتبه داخلی",
    type: "checkbox",
  },
  {
    name: "binding",
    label: "الزام آور",
    type: "checkbox",
  },
  {
    name: "draft",
    label: "پیش‌نویس",
    type: "checkbox",
  },
  {
    name: "published",
    label: "منتشر شده",
    type: "checkbox",
  },
  { name: "attachments", label: "پیوست‌ها", type: "file", multiple: true },

  {
    name: "kind_of_correspondence",
    label: "نوع مکاتبه",
    type: "select",
    options: [
      { value: "request", label: "درخواست" },
      { value: "response", label: "پاسخ" },
      { value: "notification", label: "اعلان" },
    ],
  },
  {
    name: "priority",
    label: "اولویت",
    type: "select",
    options: [
      { value: "immediate", label: "فوری" },
      { value: "normal", label: "عادی" },
      { value: "low", label: "کم" },
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

interface EditCorrespondenceProps {
  data: CorrespondenceTypes;
  onClose?: () => void;
}

interface FormField {
  name: string;
  label: string;
  type: string;
  options?: readonly { value: string; label: string }[];
}

const EditCorrespondence = ({ data, onClose }: EditCorrespondenceProps) => {
  const { mutate: updateCorrespondence } = useUpdateCorrespondence(data.id);

  const handleSubmit = (values: CorrespondenceTypes) => {
    updateCorrespondence(values, {
      onSuccess: () => {
        toast.success("مکاتبه با موفقیت ویرایش شد");
        onClose?.();
      },
      onError: () => {
        toast.error("خطا در ویرایش مکاتبه");
      },
    });
  };

  const initialValues: CorrespondenceTypes = {
    ...data,
    attachments: [],
  };

  return (
    <div className="w-full">
      <Forms
        formFields={formFields}
        initialValues={initialValues}
        validationSchema={validationSchema}
        checkboxColors={{
          borderColor: "border-secondary-500",
          checkedColor: "checked:border-[#5677BC] checked:bg-[#5677BC]",
        }}
        onSubmit={handleSubmit}
        showCloseButton={true}
        onClose={onClose}
        colors="text-[#5677BC]"
        buttonColors="bg-[#5677BC] hover:bg-[#02205F]"
        title="ویرایش مکاتبه"
        submitButtonText={{
          default: "ذخیره تغییرات",
          loading: "در حال ذخیره...",
        }}
      />
    </div>
  );
};

export default EditCorrespondence;
