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
  console.log(request);

  return (
    <div className="flex flex-col gap-4">
      <Accordion>
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

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography component="span">جزئیات بیمه</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <InsurancePayment />
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default InsurenceRequestProsses;
