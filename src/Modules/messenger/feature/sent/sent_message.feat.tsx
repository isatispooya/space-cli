import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,

} from "@mui/material";
import { useParams } from "react-router-dom";
import { useReceiveById } from "../../hooks/receive/useReceive";
import moment from "moment-jalaali";
import "moment/locale/fa";
import html2pdf from "html2pdf.js";
import {
  departmentOptions,
  referralOptions,
} from "../../data/sent/sent.data";




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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const { data } = useReceiveById(id || "");

  const handlePrint = () => {
    const element = document.getElementById("print-content");
    const opt = {
      margin: 1,
      filename: `نامه-${id}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf().set(opt).from(element).save();
  };

  const InfoRow = ({
    label,
    value,
  }: {
    label: string;
    value: string | null | undefined;
  }) => (
    <Box
      sx={{
        display: "flex",
        mb: 2.5,
        alignItems: "flex-start",
        "&:last-child": {
          mb: 0,
        },
      }}
    >
      <Typography
        sx={{
          minWidth: { xs: "110px", sm: "160px" },
          color: "text.secondary",
          fontSize: { xs: "0.9rem", sm: "0.95rem" },
          fontWeight: 500,
          pt: 0.5,
          position: "relative",
          "&::after": {
            content: '":"',
            position: "absolute",
            right: "0.5rem",
            color: "text.disabled",
          },
        }}
      >
        {label}
      </Typography>

      <Typography
        sx={{
          flex: 1,
          color: "text.primary",
          fontSize: { xs: "0.9rem", sm: "0.95rem" },
          backgroundColor: "background.paper",
          p: 1,
          borderRadius: "8px",
          boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
        }}
      >
        {value || "---"}
      </Typography>
    </Box>
  );

  if (!data?.sender) {
    return (
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography>اطلاعاتی یافت نشد</Typography>
      </Box>
    );
  }

  interface SenderType {
    subject: string;
    priority: string;
    is_internal: boolean;
    text: string;
    postcript?: string;
    description?: string;
    created_at: string;
    confidentiality_level: string;
    kind_of_correspondence: string;
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
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    p: 2,
                    borderRadius: "12px",
                    minWidth: "200px",
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
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    p: 2,
                    borderRadius: "12px",
                    minWidth: "200px",
                  }}
                >
                  <Typography>تاریخ : {formattedDate}</Typography>
                  <Typography>
                    پیوست : {sender.attachments_details?.length}
                  </Typography>
                  <Typography>شماره : {sender.id}</Typography>
                  <Typography>
                    محرمانگی :{" "}
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

        <Divider
          sx={{
            my: 4,
            borderColor: "rgba(0,0,0,0.1)",
            "&::before, &::after": {
              borderColor: "rgba(0,0,0,0.1)",
            },
          }}
        />

        {/* BOX2 */}

        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                borderRadius: "16px",
                p: 2.5,
                height: "100%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              }}
            >
              <InfoRow label="موضوع" value={sender.subject} />

              <InfoRow
                label="ارسال کننده"
                value={`${sender.sender_details?.user?.first_name} ${sender.sender_details?.user?.last_name}`}
              />
              <InfoRow
                label="دریافت کننده"
                value={
                  sender.is_internal
                    ? `${sender.receiver_internal_details?.user?.first_name} ${sender.receiver_internal_details?.user?.last_name}`
                    : sender.receiver_external
                }
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={12}>
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  mb: 2,
                  color: "text.secondary",
                  fontSize: { xs: "1rem", sm: "1.1rem" },
                  fontWeight: 500,
                }}
              >
                متن پیام:
              </Typography>
              <Typography
                sx={{
                  whiteSpace: "pre-wrap",
                  backgroundColor: "rgba(0,0,0,0.02)",
                  p: 3,
                  borderRadius: "16px",
                  fontSize: { xs: "0.95rem", sm: "1rem" },
                  lineHeight: 1.8,
                  color: "text.primary",
                  minHeight: "200px",
                  border: "1px solid",
                  borderColor: "divider",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "98%",
                    height: "1px",
                    background: (theme) =>
                      `linear-gradient(90deg, transparent, ${theme.palette.divider}, transparent)`,
                  },
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
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                    p: 2,
                    borderRadius: "12px",
                    minWidth: "200px",
                    height: "100%",
                  }}
                >
                  <Typography> </Typography>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            borderColor: "rgba(0,0,0,0.1)",
            "&::before, &::after": {
              borderColor: "rgba(0,0,0,0.1)",
            },
          }}
        />

        {/* BOX3 */}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* پی‌نوشت */}
          {sender.postcript && (
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  height: "100%",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
                  پی‌نوشت:
                </Typography>
                <Typography
                  sx={{
                    backgroundColor: "rgba(0,0,0,0.02)",
                    p: 3,
                    borderRadius: "16px",
                    fontSize: { xs: "0.95rem", sm: "1rem" },
                    lineHeight: 1.8,
                    color: "text.primary",
                    minHeight: "120px",
                  }}
                >
                  {sender.postcript}
                </Typography>
              </Box>
            </Grid>
          )}

          {/* رونوشت */}
          {sender.transcript_details &&
            sender.transcript_details.length > 0 && (
              <Grid item xs={12} md={sender.postcript ? 6 : 12}>
                <Box
                  sx={{
                    height: "100%",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
                  {sender.transcript_details.map((transcript) => (
                    <Box
                      key={transcript.id}
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.02)",
                        p: 2,
                        borderRadius: "8px",
                        mb: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        "&:last-child": { mb: 0 },
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: "0.9rem", sm: "0.95rem" },
                          color: "text.primary",
                        }}
                      >
                        {getValueLabel(
                          transcript.transcript_for,
                          referralOptions
                        )}
                      </Typography>
                      {transcript.read_at && (
                        <Typography
                          sx={{
                            fontSize: "0.8rem",
                            color: "text.secondary",
                          }}
                        >
                          {moment(transcript.read_at)
                            .locale("fa")
                            .format("jYYYY/jMM/jDD HH:mm")}
                        </Typography>
                      )}
                    </Box>
                  ))}
                </Box>
              </Grid>
            )}
        </Grid>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={12}>
            <Box
              sx={{
                height: "100%",
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
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
