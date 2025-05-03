import { Box, Paper, Button } from "@mui/material";
import { useParams } from "react-router-dom";
import { useReceiveById } from "../../hooks/receive/useReceive";
import { usePosition } from "@/Modules/positions/hooks";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { MessageHeader } from "../../components/sent/SentMessage/Header";
import { MessageContent } from "../../components/sent/SentMessage/Content";
import { MessageFooter } from "../../components/sent/SentMessage/Footer";
import { MessageAttachments } from "../../components/sent/SentMessage/Attachments";
import { MatchedUser, TranscriptDetails } from "../../types/sent/sent.type";
import { LoadingMessage } from "../../components/LoadingMessage";
import PrintIcon from "@mui/icons-material/Print";

const SentDetail = () => {
  const { id } = useParams();
  const { data } = useReceiveById(id || "");
  const { data: allposition } = usePosition.useGetAll();

  const handlePrint = () => {
    const printContent = document.getElementById("print-content");
    const originalContents = document.body.innerHTML;

    if (printContent) {
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  if (!data?.sender) {
    return <LoadingMessage />;
  }

  const userOption = data.sender.transcript_details?.map(
    (item: TranscriptDetails) => item.position.toString()
  );

  const matchedUsers: MatchedUser[] =
    allposition
      ?.filter((position) => userOption?.includes(position.id.toString()))
      .map((matched) => ({
        position: `${matched.name}`,
        id: matched.id,
        firstName: matched.user?.first_name || "",
        lastName: matched.user?.last_name || "",
      })) || [];

  const formattedDate = moment(data.sender.created_at)
    .locale("fa")
    .format("jYYYY/jMM/jDD HH:mm");

  return (
    <Box sx={{ p: { xs: 2, sm: 3 }, maxWidth: "1200px", margin: "0 auto" }}>
      <Paper
        elevation={3}
        sx={{
          p: { xs: 2.5, sm: 4 },
          borderRadius: "24px",
          backgroundColor: "#fff",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "6px",
            background: (theme) =>
              `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
          },
          "@media print": {
            padding: "10px !important",
            margin: 0,
            boxShadow: "none",
            "& *": {
              fontSize: "12px !important",
              lineHeight: "1.2 !important",
            },
            "& h1, & h2, & h3, & h4, & h5, & h6": {
              fontSize: "14px !important",
              marginBottom: "8px !important",
            },
            "& p": {
              marginBottom: "4px !important",
            },
            "& div": {
              padding: "4px !important",
              margin: "2px !important",
            },
          },
        }}
      >
        <Button
          variant="contained"
          startIcon={<PrintIcon />}
          onClick={handlePrint}
          sx={{ mb: 2, mr: 2 }}
        >
          چاپ پیام
        </Button>
        <div id="print-content">
          <MessageHeader sender={data.sender} formattedDate={formattedDate} />
          <MessageContent sender={data.sender} />
          <MessageFooter sender={data.sender} matchedUsers={matchedUsers} />
        </div>
        <Box sx={{ "@media print": { display: "none" } }}>
          <MessageAttachments
            attachments={data.sender.attachments_details || []}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default SentDetail;
