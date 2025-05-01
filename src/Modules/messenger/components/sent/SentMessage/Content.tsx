import { Box, Grid, Typography } from "@mui/material";
import { MessageContentProps } from "../../../types/sent/sent.type";

export const MessageContent = ({ sender }: MessageContentProps) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={12} md={12}>
        <Box sx={{ borderRadius: "16px", p: 2.5, height: "100%" }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 2 }}>
            موضوع : {sender.subject}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 2 }}>
            ارسال کننده : {`${sender.sender_details?.user?.first_name} ${sender.sender_details?.user?.last_name}`}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 2 }}>
            دریافت کننده :
            {sender.is_internal
              ? `${sender.receiver_internal_details?.user?.first_name} ${sender.receiver_internal_details?.user?.last_name}`
              : sender.receiver_external}
          </Typography>
        </Box>
      </Grid>

      <Grid item xs={12} md={12}>
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              whiteSpace: "pre-wrap",
              p: 3,
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

      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4, p: 2, borderRadius: "12px", minWidth: "200px", height: "100%" }}>
              <Typography> </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 4, p: 2, borderRadius: "12px", minWidth: "200px", height: "100%" }}>
              <Typography>مهر و امضا</Typography>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}; 