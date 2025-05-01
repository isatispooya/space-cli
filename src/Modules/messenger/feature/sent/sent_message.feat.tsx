import { Box, Paper, Typography, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { useReceiveById } from "../../hooks/receive/useReceive";
import moment from "moment-jalaali";
import "moment/locale/fa";
import { departmentOptions } from "../../data/sent/sent.data";
import { usePosition } from "@/Modules/positions/hooks";
import internalOptions from "../../data/sent/transcript.data";

interface TranscriptDetails {
  id: number;
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  created_at: string;
  updated_at: string;
  position: number;
  correspondence: number;
}

interface AttachmentUser {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
}

interface Attachment {
  id: number;
  user: AttachmentUser;
  name: string;
  file: string;
  size: number;
  created_at: string;
  updated_at: string;
}

const getValueLabel = (
  value: string | undefined,
  options: { label: string; value: string }[]
) => {
  if (!value) return "---";
  const option = options.find((opt) => opt.value === value);
  return option ? option.label : value;
};

const SentDetail = () => {
  const { id } = useParams();
  const { data } = useReceiveById(id || "");
  const { data: allposition } = usePosition.useGetAll();

  const userOption = data?.sender?.transcript_details?.map(
    (item: TranscriptDetails) => item.position.toString()
  );

  const matchedUsers = allposition
    ?.filter((position) => userOption?.includes(position.id.toString()))
    .map((matched) => ({
      position: `${matched.name}`,
      id: matched.id,
      firstName: matched.user?.first_name || "",
      lastName: matched.user?.last_name || "",
    }));

  if (!data?.sender) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>اطلاعاتی یافت نشد</Typography>
      </Box>
    );
  }

  interface SenderType {
    id: number;
    subject: string;
    priority: string;
    is_internal: boolean;
    text: string;
    postcript?: string;
    description?: string;
    created_at: string;
    confidentiality_level: string;
    kind_of_correspondence: string;
    number: string;
    sender_details?: {
      user?: {
        first_name: string;
        last_name: string;
      };
    };
    receiver_internal_details?: {
      user?: {
        first_name: string;
        last_name: string;
      };
    };
    receiver_external?: string;
    attachments_details?: Attachment[];
    authority_type?: string;
    transcript_details?: TranscriptDetails[];
  }

  const sender: SenderType = data.sender;
  const formattedDate = moment(sender.created_at)
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
        {/* BOX1 */}
        <Box sx={{ mb: 4, position: "relative" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={9}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "flex-start",
                    height: "100%",
                    p: 2,
                  }}
                >
                  {" "}
                </Box>
              </Grid>

              <Grid item xs={12} md={3}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                    alignItems: "flex-start",
                    p: 2,
                  }}
                >
                  <Typography>تاریخ : {formattedDate}</Typography>
                  <Typography>
                    پیوست : {sender.attachments_details?.length}
                  </Typography>
                  <Typography>شماره : {sender.number}</Typography>
                  <Typography>
                    طبقه بندی :{" "}
                    {getValueLabel(
                      sender.confidentiality_level,
                      departmentOptions
                    )}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>

        {/* BOX2 */}

        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                borderRadius: "16px",
                p: 2.5,
                height: "100%",
              }}
            >
              <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 2 }}>
                موضوع : {sender.subject}
              </Typography>

              <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 2 }}>
                ارسال کننده :{" "}
                {`${sender.sender_details?.user?.first_name} ${sender.sender_details?.user?.last_name}`}
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
                <Box
                  sx={{
                    mb: 4,
                    p: 2,
                    borderRadius: "12px",
                    minWidth: "200px",
                    height: "100%",
                  }}
                >
                  <Typography> </Typography>
                </Box>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box
                  sx={{
                    mb: 4,
                    p: 2,
                    borderRadius: "12px",
                    minWidth: "200px",
                    height: "100%",
                  }}
                >
                  <Typography>مهر و امضا</Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* BOX3 */}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* پی‌نوشت */}

          {/* رونوشت */}
          {sender.transcript_details &&
            sender.transcript_details.length > 0 && (
              <Grid item xs={12} md={12}>
                <Box
                  sx={{
                    height: "100%",
                    p: 2,
                    borderRadius: "12px",
                  }}
                >
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
              <Box
                sx={{
                  p: 2,
                  borderRadius: "12px",
                }}
              >
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
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                height: "100%",
                p: 2,
                borderRadius: "12px",
              }}
            >
              {" "}
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default SentDetail;
