import { Box, Grid, Typography } from "@mui/material";
import { MessageContentPropsType } from "../../../types/sent/sent.type";

export const MessageContent = ({
  sender,
  allposition,
}: MessageContentPropsType) => {
  let signature: string | undefined;

  if (
    allposition &&
    Array.isArray(allposition) &&
    sender &&
    sender.sender_details?.user
  ) {
    const senderUserId = sender.sender_details.user.id;
    for (let i = 0; i < allposition.length; i++) {
      if (allposition[i]?.user?.id === senderUserId) {
        signature = allposition[i].signature;
      }
    }
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={12}>
        <Box sx={{ borderRadius: "16px", p: 2.5 }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            از:{" "}
            {`${sender.sender_details?.user?.first_name} ${sender.sender_details?.user?.last_name}  ${sender.sender_details?.name}`}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            به:
            {sender.is_internal
              ? `${sender.receiver_internal_details?.user?.first_name} ${sender.receiver_internal_details?.user?.last_name} ${sender.receiver_internal_details?.name}`
              : sender.receiver_external}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            موضوع : {sender.subject}
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
          {sender.is_internal ? (
            <Typography
              sx={{
                whiteSpace: "pre-wrap",
                fontSize: { xs: "0.95rem", sm: "1rem" },
                lineHeight: 1.8,
                color: "text.primary",
                position: "relative",
                display: "flex",
                justifyContent: "left",
              }}
            >
              امضا
              {signature || "ندارد"}
            </Typography>
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
};
