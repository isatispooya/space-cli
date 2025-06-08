import { Forms, Toast } from "@/components";
import { FormFieldType } from "@/types";
import * as Yup from "yup";
import { ReferralReqType } from "../../types/receive/ReceiveMessage.type";
import { useReceive } from "../../hooks/receive";
import { usePosition } from "@/Modules/positions";
import { useParams, useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";

const ReferralForm = () => {
  const { id } = useParams();
  const { mutate: postRefferal } = useReceive.usePostRefferal();
  const { data: positions } = usePosition.useGetAll();
  const { data } = useReceive.useGetReceiveWorkflow();
  const navigate = useNavigate();
  const correspondenceId = data?.map((item: any) => item.correspondence);
  const referenceId = data?.map(
    (item: any) => item.correspondence_details.sender_details.id
  );
  const validationSchema = Yup.object({
    from_reference: Yup.number().required("ارجاع الزامی است"),
    correspondence: Yup.number().required("نامه الزامی است"),
    instruction_text: Yup.string().required("متن ارجاع الزامی است"),
    reference: Yup.number().required("ارجاع الزامی است"),
  });

  const formFields: FormFieldType[] = [
    {
      name: "from_reference",
      label: "ارجاع به",
      type: "select",
      options: positions?.map((position) => ({
        label: `${position.name} - ${position.user?.first_name || ""} ${
          position.user?.last_name || ""
        }`,
        value: position.id,
      })),
      format: (value: any) => Number(value),
    },
    {
      name: "instruction_text",
      label: "متن ارجاع",
      type: "text",
    },
  ];

  const initialValues: ReferralReqType = {
    from_reference: 0,
    correspondence: Number(correspondenceId) || 0,
    instruction_text: "",
    reference: Number(referenceId) || 0,
    status_reference: "doing",
    workflow: Number(id) || 0,
  };

  const handleSubmit = async (values: ReferralReqType) => {
    postRefferal(values, {
      onSuccess: () => {
        Toast(
          "ارجاع با موفقیت انجام شد",
          <Check className="text-green-500" />,
          "bg-green-500"
        );
        navigate("/letter/refferal-table/" + id);
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
      validationSchema={validationSchema as any}
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
