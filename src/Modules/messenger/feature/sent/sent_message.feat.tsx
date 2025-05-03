import { Box, Paper } from "@mui/material";
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

const SentDetail = () => {
  const { id } = useParams();
  const { data } = useReceiveById(id || "");
  const { data: allposition } = usePosition.useGetAll();

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
        id="print-content"
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
        }}
      >
        <MessageHeader sender={data.sender} formattedDate={formattedDate} />
        <MessageContent sender={data.sender} />
        <MessageFooter sender={data.sender} matchedUsers={matchedUsers} />
        <MessageAttachments attachments={data.sender.attachments_details || []} />
      </Paper>
    </Box>
  );
};

export default SentDetail;
