import { useParams } from "react-router-dom";
import { useInsurance } from "../../hooks";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InsuranceRequestUpdate } from "../..";
import { InsurancePayment } from ".";
import { useUserPermissions } from "../../../permissions";

const InsurenceRequestProsses = () => {
  const { id } = useParams();
  const { data: request } = useInsurance.useGetRequestsById(Number(id));
  const { data: Permissions } = useUserPermissions();

  const hasPermission =
    Array.isArray(Permissions) &&
    Permissions.some((perm) => perm.codename === "add_insurancename");

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
    <div className="w-[80%] mx-auto rounded-lg shadow-md p-4 ">
      <div className="flex flex-col gap-4">
        <Accordion
          sx={{ backgroundColor: "#f5fdfe", borderRadius: "10px" }}
          disabled={isLocked_step_1}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography component="span">اطلاعات درخواست</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <InsuranceRequestUpdate />
          </AccordionDetails>
        </Accordion>

        <Accordion
          sx={{ backgroundColor: "#f5fdfe", borderRadius: "10px" }}
          disabled={isLocked_step_2}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
          >
            <Typography component="span">پرداخت</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <InsurancePayment />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default InsurenceRequestProsses;
