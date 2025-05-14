import { Forms, Toast } from "@/components";
import { FormFieldType } from "@/types";
import * as Yup from "yup";
import { ReferralReqType } from "../../types/receive/ReceiveMessage.type";
import { useReceive } from "../../hooks/receive";
import { usePosition } from "@/Modules/positions";
import { useParams } from "react-router-dom";
import { Check, X } from "lucide-react";

const ReferralForm = () => {
  const { id } = useParams();

  const { mutate: postRefferal } = useReceive.usePostRefferal();
  const { data: positions } = usePosition.useGetAll();

  const validationSchema = Yup.object().shape({
    reference: Yup.number().required("ارجاع الزامی است"),
    correspondence: Yup.number().required("نامه الزامی است"),
    instruction_text: Yup.string().required("متن ارجاع الزامی است"),
  });

  const formFields: FormFieldType[] = [
    {
      name: "reference",
      label: "ارجاع به",
      type: "select",
      options: positions?.map((position) => ({
        label:
          position.name +
          " - " +
          position.user?.first_name +
          " " +
          position.user?.last_name,
        value: position.id.toString(),
      })),
    },
    {
      name: "instruction_text",
      label: "متن ارجاع",
      type: "text",
    },
  ];

  const initialValues: ReferralReqType = {
    reference: 0,
    correspondence: Number(id) || 0,
    instruction_text: "",
  };

  const handleSubmit = async (values: ReferralReqType) => {
    postRefferal(values, {
      onSuccess: () => {
        Toast(
          "ارجاع با موفقیت انجام شد",
          <Check className="text-green-500" />,
          "bg-green-500"
        );
      },
      onError: () => {
        Toast(
          "ارجاع با مشکل مواجه شد",
          <X className="text-red-500" />,
          "bg-red-500"
        );
      },
    });
  };

  return (
    <Forms
      formFields={formFields}
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      title="ارجاع نامه"
      submitButtonText={{
        default: "ارجاع",
        loading: "در حال ارجاع...",
      }}
      colors="text-[#29D2C7]"
      buttonColors="bg-[#29D2C7] hover:bg-[#29D2C7]"
    />
  );
};

export default ReferralForm;
