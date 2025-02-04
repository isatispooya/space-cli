import { useParams } from "react-router-dom";
import { useInsurance } from "../../hooks";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { InsuranceRequestUpdate } from "../..";
import { InsurancePayment } from ".";

const InsurenceRequestProsses = () => {
  const { id } = useParams();
  const { data: request } = useInsurance.useGetRequestsById(Number(id));

  const isLocked =
    request?.insurance_status === "pending_issue" ||
    request?.insurance_status === "missing_document";

  return (
    <div className="w-[80%] mx-auto rounded-lg shadow-md p-4 ">
      <div className="flex flex-col gap-4">
        <Accordion
          sx={{ backgroundColor: "#f5fdfe", borderRadius: "10px" }}
          disabled={!isLocked}
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
          disabled={isLocked}
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
