import { Box, Grid, Typography } from "@mui/material";
import { MessageContentPropsType } from "../../../types/sent/sent.type";
export const MessageContent = ({
  sender,
  allposition,
}: MessageContentPropsType) => {
  const senderUser = sender?.sender_details?.user;
  const receiverInternal = sender?.receiver_internal_details;
  const senderCompany = sender?.sender_details?.company_detail?.name;

  const matchedPosition = allposition?.find(
    (pos) => pos?.user?.id === senderUser?.id
  );
  const signature = matchedPosition?.signature;
  const seal = matchedPosition?.seal;

  const senderFullName = `${senderUser?.first_name || ""} ${
    senderUser?.last_name || ""
  } ${sender?.sender_details?.name || ""} ${senderCompany || ""}`;
  const receiverFullName = sender.is_internal
    ? `${receiverInternal?.user?.first_name || ""} ${
        receiverInternal?.user?.last_name || ""
      } ${receiverInternal?.name || ""} ${
        receiverInternal?.company_detail?.name || ""
      }`
    : sender.receiver_external;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ borderRadius: 2, p: 2.5 }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            از: {senderFullName}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            به: {receiverFullName}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            موضوع: {sender.subject}
          </Typography>
        </Box>
      </Grid>

      {sender.is_internal && (
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", mr: 12.5 }}
        >
          <Box sx={{ borderRadius: 1.5 }}>
            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                lineHeight: 1.8,
                color: "text.primary",
                mb: 1,
              }}
            >
              مهر {sender.published ? seal : ""}
            </Typography>
            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                lineHeight: 1.8,
                color: "text.primary",
              }}
            >
              امضا {sender.published ? signature : ""}
            </Typography>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
