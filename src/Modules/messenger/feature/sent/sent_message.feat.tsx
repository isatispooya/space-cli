import {
  Box,
  Paper,
  Typography,
  Grid,
  Divider,
  Chip,
  useTheme,
  useMediaQuery,
  Link,
  IconButton,
  Tooltip,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useReceiveById } from "../../hooks/receive/useReceive";
import moment from "moment-jalaali";
import "moment/locale/fa";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import ImageIcon from "@mui/icons-material/Image";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import ArticleIcon from "@mui/icons-material/Article";
import {
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
  referralOptions,
} from "../../data/sent/sent.data";

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 بایت";
  const k = 1024;
  const sizes = ["بایت", "کیلوبایت", "مگابایت", "گیگابایت"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

const getFileIcon = (fileName: string) => {
  const extension = fileName.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "jpg":
    case "jpeg":
    case "png":
    case "gif":
      return <ImageIcon />;
    case "pdf":
      return <PictureAsPdfIcon />;
    case "doc":
    case "docx":
      return <ArticleIcon />;
    default:
      return <InsertDriveFileIcon />;
  }
};

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
        <Box sx={{ mb: 4, position: "relative" }}>
          <Typography
            variant="h5"
            sx={{
              mb: 2,
              fontSize: { xs: "1.3rem", sm: "1.6rem" },
              fontWeight: "600",
              color: "text.primary",
              lineHeight: 1.3,
            }}
          >
            {sender.subject}
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", gap: 1.5, flexWrap: "wrap" }}>
              <Chip
                label={getValueLabel(sender.priority, priorityOptions)}
                color={sender.priority === "urgent" ? "error" : "default"}
                size={isMobile ? "small" : "medium"}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 500,
                  px: 1,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                  background:
                    sender.priority === "urgent"
                      ? "linear-gradient(45deg, #ff5252, #ff1744)"
                      : "linear-gradient(45deg, #90a4ae, #78909c)",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
                  },
                }}
              />
              <Chip
                label={sender.is_internal ? "داخلی" : "خارجی"}
                color="primary"
                size={isMobile ? "small" : "medium"}
                sx={{
                  borderRadius: "12px",
                  fontWeight: 500,
                  px: 1,
                  "& .MuiChip-label": {
                    px: 1,
                  },
                  background: "linear-gradient(45deg, #2196f3, #1976d2)",
                  color: "#fff",
                  boxShadow: "0 2px 8px rgba(33,150,243,0.3)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 4px 12px rgba(33,150,243,0.4)",
                  },
                }}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "primary.main",
                color: "white",
                borderRadius: "12px",
                fontWeight: 500,
                padding: "8px 10px",
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              }}
            >
              چاپ
            </Button>
          </div>
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

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.02)",
                borderRadius: "16px",
                p: 2.5,
                height: "100%",
              }}
            >
              <InfoRow
                label="ارسال کننده"
                value={`${sender.sender_details?.user?.first_name} ${sender.sender_details?.user?.last_name}`}
              />
              <InfoRow
                label="گیرنده"
                value={
                  sender.is_internal
                    ? `${sender.receiver_internal_details?.user?.first_name} ${sender.receiver_internal_details?.user?.last_name}`
                    : sender.receiver_external
                }
              />
              <InfoRow label="تاریخ ارسال" value={formattedDate} />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "rgba(0,0,0,0.02)",
                borderRadius: "16px",
                p: 2.5,
                height: "100%",
              }}
            >
              <InfoRow
                label="سطح محرمانگی"
                value={getValueLabel(
                  sender.confidentiality_level,
                  departmentOptions
                )}
              />
              <InfoRow
                label="نوع نامه"
                value={getValueLabel(
                  sender.kind_of_correspondence,
                  letterTypeOptions
                )}
              />
              {sender.authority_type && (
                <InfoRow
                  label="نوع ارجاع"
                  value={getValueLabel(sender.authority_type, referralOptions)}
                />
              )}
            </Box>
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

        <Grid container spacing={3} sx={{ mb: 4 }}>
          {(sender.postcript || sender.description) && (
            <>
              {sender.postcript && (
                <Grid item xs={12} md={6}>
                  <Box sx={{ height: "100%" }}>
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
                        height: "calc(100% - 40px)",
                        minHeight: "120px",
                      }}
                    >
                      {sender.postcript}
                    </Typography>
                  </Box>
                </Grid>
              )}
              {sender.description && (
                <Grid item xs={12} md={sender.postcript ? 6 : 12}>
                  <Box sx={{ height: "100%" }}>
                    <Typography
                      sx={{
                        mb: 2,
                        color: "text.secondary",
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        fontWeight: 500,
                      }}
                    >
                      توضیحات:
                    </Typography>
                    <Typography
                      sx={{
                        backgroundColor: "rgba(0,0,0,0.02)",
                        p: 3,
                        borderRadius: "16px",
                        fontSize: { xs: "0.95rem", sm: "1rem" },
                        lineHeight: 1.8,
                        color: "text.primary",
                        height: "calc(100% - 40px)",
                        minHeight: "120px",
                      }}
                    >
                      {sender.description}
                    </Typography>
                  </Box>
                </Grid>
              )}
            </>
          )}
        </Grid>

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

        {sender.attachments_details &&
          sender.attachments_details.length > 0 && (
            <Box sx={{ mt: 4 }}>
              <Typography
                variant="h6"
                sx={{
                  mb: 3,
                  color: "text.primary",
                  fontSize: { xs: "1.1rem", sm: "1.2rem" },
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  position: "relative",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    bottom: -8,
                    left: 0,
                    width: "60px",
                    height: "3px",
                    background:
                      "linear-gradient(90deg, primary.main, primary.light)",
                    borderRadius: "2px",
                  },
                }}
              >
                <InsertDriveFileIcon
                  sx={{
                    color: "primary.main",
                    animation: "pulse 2s infinite",
                    "@keyframes pulse": {
                      "0%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.1)" },
                      "100%": { transform: "scale(1)" },
                    },
                  }}
                />
                پیوست‌ها ({sender.attachments_details.length})
              </Typography>
              <Grid container spacing={2.5}>
                {sender.attachments_details.map((attachment, index) => (
                  <Grid item xs={12} sm={6} md={4} key={attachment.id}>
                    <Paper
                      elevation={2}
                      sx={{
                        p: 2.5,
                        borderRadius: "16px",
                        background: (theme) =>
                          `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                        backdropFilter: "blur(10px)",
                        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                        animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                        "@keyframes fadeIn": {
                          from: {
                            opacity: 0,
                            transform: "translateY(20px)",
                          },
                          to: {
                            opacity: 1,
                            transform: "translateY(0)",
                          },
                        },
                        "&:hover": {
                          transform: "translateY(-8px) scale(1.02)",
                          boxShadow: (theme) =>
                            `0 20px 30px -10px ${theme.palette.primary.main}20`,
                          "& .download-icon": {
                            transform: "scale(1.1)",
                            color: "primary.main",
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 2 }}
                      >
                        <Box
                          sx={{
                            color: "primary.main",
                            mr: 2,
                            transform: "scale(1.2)",
                            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
                          }}
                        >
                          {getFileIcon(attachment.name)}
                        </Box>
                        <Typography
                          sx={{
                            flex: 1,
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "text.primary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {attachment.name}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 1.5,
                          p: 1,
                          borderRadius: "8px",
                          backgroundColor: "rgba(0,0,0,0.03)",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: "text.secondary",
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          {formatFileSize(attachment.size)}
                        </Typography>
                        <Typography
                          sx={{
                            fontSize: "0.85rem",
                            color: "text.secondary",
                            fontWeight: 500,
                          }}
                        >
                          {moment(attachment.created_at).locale("fa").fromNow()}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 2,
                          pt: 2,
                          borderTop: "1px solid",
                          borderColor: "divider",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.9rem",
                            color: "text.secondary",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            maxWidth: "70%",
                          }}
                        >
                          {attachment.user.first_name}{" "}
                          {attachment.user.last_name}
                        </Typography>
                        <Tooltip title="دانلود فایل" arrow placement="top">
                          <IconButton
                            component={Link}
                            href={attachment.file}
                            target="_blank"
                            className="download-icon"
                            sx={{
                              color: "text.secondary",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                backgroundColor: "primary.light",
                                "& svg": {
                                  transform: "translateY(2px)",
                                },
                              },
                            }}
                          >
                            <FileDownloadIcon
                              sx={{ transition: "transform 0.3s ease" }}
                            />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

        {sender.transcript_details && sender.transcript_details.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                color: "text.primary",
                fontSize: { xs: "1.1rem", sm: "1.2rem" },
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: 1,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -8,
                  left: 0,
                  width: "60px",
                  height: "3px",
                  background:
                    "linear-gradient(90deg, primary.main, primary.light)",
                  borderRadius: "2px",
                },
              }}
            >
              رونوشت‌ها ({sender.transcript_details.length})
            </Typography>
            <Grid container spacing={2.5}>
              {sender.transcript_details.map((transcript, index) => (
                <Grid item xs={12} sm={6} md={4} key={transcript.id}>
                  <Paper
                    elevation={2}
                    sx={{
                      p: 2.5,
                      borderRadius: "16px",
                      background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.default} 100%)`,
                      backdropFilter: "blur(10px)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      animation: `fadeIn 0.6s ease-out ${index * 0.1}s both`,
                      "@keyframes fadeIn": {
                        from: {
                          opacity: 0,
                          transform: "translateY(20px)",
                        },
                        to: {
                          opacity: 1,
                          transform: "translateY(0)",
                        },
                      },
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: (theme) =>
                          `0 12px 20px -8px ${theme.palette.primary.main}15`,
                      },
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 2,
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "1rem",
                          fontWeight: 600,
                          color: "text.primary",
                        }}
                      >
                        {transcript.transcript_for === "notification"
                          ? "اطلاع"
                          : "اقدام"}
                      </Typography>
                      <Chip
                        label={transcript.security ? "محرمانه" : "عادی"}
                        size="small"
                        color={transcript.security ? "error" : "default"}
                        sx={{
                          borderRadius: "8px",
                          fontSize: "0.75rem",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1.5,
                        p: 1,
                        borderRadius: "8px",
                        backgroundColor: "rgba(0,0,0,0.03)",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "text.secondary",
                        }}
                      >
                        شماره موقعیت: {transcript.position}
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "text.secondary",
                          fontWeight: 500,
                        }}
                      >
                        {moment(transcript.created_at).locale("fa").fromNow()}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mt: 2,
                        pt: 2,
                        borderTop: "1px solid",
                        borderColor: "divider",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "text.secondary",
                        }}
                      >
                        وضعیت مطالعه:
                      </Typography>
                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: transcript.read_at
                            ? "success.main"
                            : "warning.main",
                          fontWeight: 500,
                        }}
                      >
                        {transcript.read_at ? "خوانده شده" : "خوانده نشده"}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default SentDetail;
