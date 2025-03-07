import { useParams } from "react-router-dom";
import { useInsurance } from "../../hooks";
import Accordion from "../../../../components/common/accordian/accordian";
import { InsuranceRequestUpdate } from "../..";
import { InsurancePayment } from ".";
import { useUserPermissions } from "../../../permissions";
import { useState } from "react";

const InsurenceRequestProsses = () => {
  const { id } = useParams();
  const { data: request } = useInsurance.useGetRequestsById(Number(id));
  const { data: Permissions } = useUserPermissions();
  const [isOpen, setIsOpen] = useState(false);

  const [isOpen2, setIsOpen2] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  const hasPermission =
    Array.isArray(Permissions) &&
    Permissions.some((perm) => perm.codename === "add_insurance_name");

  const isLocked_step_1 =
    request?.insurance_status.includes([
      "pending_payment",
      "pending_issue",
      "finished",
      "rejected",
      "pending_review",
    ]) && !hasPermission;
  const isLocked_step_2 =
    request?.insurance_status !== "pending_payment" && !hasPermission;

  return (
    <div className="w-[80%] mx-auto rounded-lg p-4 flex flex-col gap-4">
      <Accordion
        title="اطلاعات درخواست"
        isOpen={isOpen}
        onToggle={handleToggle}
        disabled={isLocked_step_1}
      >
        <InsuranceRequestUpdate />
      </Accordion>

      <Accordion
        title="پرداخت"
        isOpen={isOpen2}
        onToggle={handleToggle2}
        disabled={isLocked_step_2}
      >
        <InsurancePayment />
      </Accordion>
    </div>
  );
};

export default InsurenceRequestProsses;
