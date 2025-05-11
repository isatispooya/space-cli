import { Box, Divider, Grid, Typography } from "@mui/material";
import { MessageFooterPropsType, TranscriptDetailsType, MatchedUserType } from "../../../types/sent/sent.type";
import internalOptions from "../../../data/sent/transcript.data";
import { getValueLabel } from "../../../utils/helpers";

export const MessageFooter = ({ sender, matchedUsers }: MessageFooterPropsType) => {
  // فیلتر کردن رونوشت‌هایی که security آنها true نیست
  const filteredTranscripts = sender.transcript_details?.filter(
    (transcript: TranscriptDetailsType) => !transcript.security
  );

  return (
    <>
      <Grid container spacing={2} sx={{ position: 'relative', minHeight: '100%' }}>
        {filteredTranscripts && filteredTranscripts.length > 0 && (
          <Grid item xs={12} md={12}>
            <Box sx={{ borderRadius: "12px" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                  fontWeight: 500,
                }}
              >
                رونوشت:
              </Typography>
              {filteredTranscripts.map((transcript: TranscriptDetailsType) => {
                const positionInfo = matchedUsers?.find(
                  (user: MatchedUserType) => user.id === transcript.position
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
                      p: 0.5,
                      borderRadius: "8px",
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
            <Box sx={{ p: 1, borderRadius: "12px" }}>
              <Typography
                sx={{
                  color: "text.secondary",
                  fontSize: { xs: "0.9rem", sm: "0.95rem" },
                  fontWeight: 500,
                }}
              >
                پی‌نوشت: {sender.postcript}
              </Typography>
            </Box>
          </Grid>
        )}
        <Grid item xs={12} md={12} sx={{ 
          '@media print': {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            width: '100%',
            backgroundColor: 'white',
            padding: '10px',
            marginBottom: 0
          }
        }}>
          <Divider />
          <Box
            sx={{
              borderRadius: "10px",
              backgroundColor: "background.paper",
            }}
          >
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: { xs: "0.9rem", sm: "0.95rem" },
                fontWeight: 500,
                display: "flex",
                flexDirection: "row",
                gap: 0.5,
              }}
            >
              <span className="p-4">
                آدرس:{sender.sender_details?.company_detail?.address}
              </span>
              <span className="p-4">|</span>
              <span className="p-4">
                تلفن تماس:{sender.sender_details?.company_detail?.phone}
              </span>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};
