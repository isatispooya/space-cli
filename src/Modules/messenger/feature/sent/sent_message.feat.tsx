import { Box, Paper, Button, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { usePosition } from "@/Modules/positions/hooks";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { MessageHeader } from "../../components/sent/SentMessage/Header";
import { MessageContent } from "../../components/sent/SentMessage/Content";
import { MessageFooter } from "../../components/sent/SentMessage/Footer";
import { MessageAttachments } from "../../components/sent/SentMessage/Attachments";
import { MatchedUserType, SenderType } from "../../types/sent/sent.type";
import { TranscriptDetailsType } from "../../types/sent/transcript.type";
import { LoadingMessage } from "../../components/LoadingMessage";
import PrintIcon from "@mui/icons-material/Print";
import { useReceive } from "../../hooks/receive";

const SentDetail = () => {
  const { id } = useParams();
  const { data, isLoading } = useReceive.useGetById(id || "");
  const { data: allposition, isLoading: isLoadingPositions } =
    usePosition.useGetAll();

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

  if (isLoading || isLoadingPositions) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "80vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!data) {
    return <LoadingMessage />;
  }

  const receivedData = data as unknown as SenderType;

  const userOption = receivedData.transcript_details?.map(
    (item: TranscriptDetailsType) => item.position?.toString() || ""
  );

  const matchedUsers: MatchedUserType[] =
    allposition
      ?.filter((position) => userOption?.includes(position.id.toString()))
      .map((matched) => ({
        position: `${matched.name}`,
        id: matched.id,
        firstName: matched.user?.first_name || "",
        lastName: matched.user?.last_name || "",
      })) || [];

  const formattedDate = moment(receivedData.created_at)
    .locale("fa")
    .format("jYYYY/jMM/jDD HH:mm");

  const showLetterhead = receivedData.letterhead !== false;


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
              display: "block !important",
              visibility: "visible !important",
              opacity: "1 !important",
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
              pageBreakInside: "avoid !important",
              display: "block !important",
            },
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
            variant="contained"
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            چاپ پیام
          </Button>
        </Box>
        <div id="print-content">
          <Box
            sx={{
              height: "100%",
              minHeight: showLetterhead ? "80vh" : "auto",
              display: "flex",
              flexDirection: "column",
              "@media print": {
                minHeight: "100vh",
                display: "flex !important",
                flexDirection: "column !important",
                justifyContent: "space-between !important",
                "& > *": {
                  marginBottom: "2rem !important",
                },
              },
            }}
          >
            <MessageHeader
              sender={receivedData}
              formattedDate={formattedDate}
            />
            <Box
              sx={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                minHeight: showLetterhead ? undefined : "auto",
                "@media print": {
                  display: "flex !important",
                  flexDirection: "column !important",
                  justifyContent: "center !important",
                },
              }}
            >
              <MessageContent sender={receivedData} allposition={allposition} />
            </Box>
            {showLetterhead && (
              <Box
                sx={{
                  "@media print": {
                    display: "block !important",
                    visibility: "visible !important",
                    marginTop: "2rem !important",
                    pageBreakInside: "avoid !important",
                    position: "relative !important",
                  },
                }}
              >
                <MessageFooter
                  sender={receivedData}
                  matchedUsers={matchedUsers}
                />
              </Box>
            )}
          </Box>
          <Box sx={{ "@media print": { display: "none" } }}>
            <MessageAttachments
              attachments={receivedData.attachments_details || []}
            />
          </Box>
        </div>
      </Paper>
    </Box>
  );
};

export default SentDetail;
