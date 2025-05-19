import { Box, Typography, Paper, Button } from "@mui/material";
import { AttachFile, Download } from "@mui/icons-material";
import { server } from "@/api";
import { AttachmentsPropsType } from "../../../types/sent/attachment.type";
export const MessageAttachments = ({ attachments }: AttachmentsPropsType) => {
  if (!attachments || attachments.length === 0) return null;

  const handleDownload = (fileUrl: string) => {
    const fullUrl = `${server}${fileUrl}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <Box
      sx={{ mt: 4, border: "1px solid #e0e0e0", p: 2, borderRadius: "10px" }}
    >
      <Typography
        variant="h6"
        sx={{
          mb: 2.5,
          fontWeight: 600,
          display: "flex",
          alignItems: "center",
          color: "text.primary",
          "&::before": {
            content: '""',
            width: 4,
            height: 20,
            backgroundColor: "primary.main",
            marginLeft: 1.5,
            borderRadius: 1,
          },
        }}
      >
        پیوست‌های نامه
      </Typography>
      <Box sx={{ display: "grid" }}>
        {attachments.map((attachment) => (
          <Paper
            key={attachment.id}
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              p: 2,
              borderRadius: 2,
              border: "1px solid",
              borderColor: "divider",
              transition: "all 0.2s ease-in-out",
              backgroundColor: "background.paper",
              "&:hover": {
                backgroundColor: "action.hover",
                transform: "translateY(-2px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              },
            }}
          >
            <AttachFile
              sx={{
                mr: 2,
                color: "primary.main",
                fontSize: 28,
              }}
            />
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                sx={{
                  color: "text.primary",
                  fontWeight: 500,
                  fontSize: "0.95rem",
                }}
              >
                {attachment.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "text.secondary",
                  mt: 0.5,
                }}
              >
                حجم فایل: {(attachment.size / 1024).toFixed(1)} کیلوبایت
              </Typography>
            </Box>
            <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={() => handleDownload(attachment.file)}
                sx={{
                  borderRadius: 2,
                  boxShadow: "none",
                  "&:hover": {
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  },
                }}
              >
                دانلود
              </Button>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};
