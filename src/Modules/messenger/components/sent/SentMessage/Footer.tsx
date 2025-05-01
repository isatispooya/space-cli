import { Box, Grid, Typography } from "@mui/material";
import { MessageFooterProps } from "../../../types/sent/sent.type";
import internalOptions from "../../../data/sent/transcript.data";
import { getValueLabel } from "../../../utils/helpers";

export const MessageFooter = ({ sender, matchedUsers }: MessageFooterProps) => {
  return (
    <>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {sender.transcript_details && sender.transcript_details.length > 0 && (
          <Grid item xs={12} md={12}>
            <Box sx={{ height: "100%", p: 2, borderRadius: "12px" }}>
              <Typography
                sx={{
                  mb: 2,
                  color: "text.secondary",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  fontWeight: 500,
                }}
              >
                رونوشت:
              </Typography>
              {sender?.transcript_details.map((transcript) => {
                const positionInfo = matchedUsers?.find(
                  (user) => user.id === transcript.position
                );
                const positionText = positionInfo?.position || "نامشخص";
                const userFullName =
                  positionInfo?.firstName && positionInfo?.lastName
                    ? `_ ${positionInfo.firstName} ${positionInfo.lastName} `
                    : "";
                const referralLabel = getValueLabel(
                  transcript.transcript_for,
                  internalOptions
                );

                return (
                  <Typography
                    key={transcript.id}
                    sx={{
                      p: 2,
                      borderRadius: "8px",
                      mb: 1,
                      backgroundColor: "background.paper",
                      fontSize: { xs: "0.9rem", sm: "0.95rem" },
                      color: "text.primary",
                    }}
                  >
                    {userFullName}
                    {positionText} جهت {referralLabel}
                  </Typography>
                );
              })}
            </Box>
          </Grid>
        )}

        {sender?.postcript && (
          <Grid item xs={12} md={12}>
            <Box sx={{ p: 2, borderRadius: "12px" }}>
              <Typography
                sx={{
                  mb: 2,
                  color: "text.secondary",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  fontWeight: 500,
                }}
              >
                پی‌نوشت: {sender.postcript}
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </>
  );
}; 