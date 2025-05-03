import { Box, Grid, Typography } from "@mui/material";
import { MessageContentProps } from "../../../types/sent/sent.type";

export const MessageContent = ({ sender }: MessageContentProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Box sx={{ borderRadius: "16px", p: 2.5 }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            موضوع : {sender.subject}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            ارسال کننده :{" "}
            {`${sender.sender_details?.user?.first_name} ${sender.sender_details?.user?.last_name}  ${sender.sender_details?.name}`}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            دریافت کننده :
            {sender.is_internal
              ? `${sender.receiver_internal_details?.user?.first_name} ${sender.receiver_internal_details?.user?.last_name} ${sender.receiver_internal_details?.name}`
              : sender.receiver_external}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box>
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              fontSize: { xs: "0.95rem", sm: "1rem" },
              lineHeight: 1.8,
              color: "text.primary",
              position: "relative",
            }}
          >
            {sender.text}
          </Typography>
        </Box>
      </Grid>

      <Grid
        item
        xs={12}
        md={12}
        sx={{ display: "flex", justifyContent: "flex-end", mr: "100px" }}
      >
        <Box sx={{ mb: 1, borderRadius: "12px" }}>
          <Typography>مهر و امضا</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};
