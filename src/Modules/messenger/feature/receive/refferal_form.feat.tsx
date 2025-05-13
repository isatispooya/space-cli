import { Forms } from "@/components";
import { FormFieldType } from "@/types";
import * as Yup from "yup";
import { ReferralReqType } from "../../types/receive/ReceiveMessage.type";
import { useReceive } from "../../hooks/receive";
import { usePosition } from "@/Modules/positions";
import { useParams } from "react-router-dom";

const ReferralForm = () => {
  const { id } = useParams();
  const handleSubmit = async (values: ReferralReqType) => {
    console.log(values);
  };
  const { data: positions } = usePosition.useGetAll();

  const { data: receive } = useReceive.useGetById(id || "");

  console.log(receive);

  console.log(positions);

  const validationSchema = Yup.object().shape({
    reference: Yup.number().required("Reference is required"),
    position_id: Yup.string().required("Position is required"),
    correspondence: Yup.number().required("Correspondence is required"),
    order: Yup.string().required("Order is required"),
  });

  console.log(id);
  const formFields: FormFieldType[] = [
    {
      name: "reference",
      label: "Reference",
      type: "text",
    },
    {
      name: "position_id",
      label: "سمت",
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
      name: "correspondence",
      label: "نامه مرجع",
      type: "text",
      value: id,
      disabled: true,
    },
    {
      name: "order",
      label: "متن ارجاع",
      type: "text",
    },
  ];

  const initialValues: ReferralReqType = {
    reference: 0,
    position_id: "",
    correspondence: 0,
    order: "",
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
