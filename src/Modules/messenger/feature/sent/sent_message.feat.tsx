import { Box, Typography, Paper, Chip } from "@mui/material";

const sampleSentMessage = {
  id: "123445678",
  subject: "پاسخ به درخواست همکاری",
  receiver: "علی محمدی",
  sentDate: "۱۴۰۳/۰۱/۱۶ - ۱۰:۳۰",
  priority: "فوری",
  department: "منابع انسانی",
  status: "ارسال شده",
  content:
    "با سلام و تشکر از درخواست شما. پس از بررسی رزومه‌تان، مایل هستیم شما را به مصاحبه حضوری دعوت کنیم.",
};

const SentMessage = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          نامه ارسالی
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 2,
            mb: 3,
          }}
        >
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>شماره نامه:</span>{" "}
            {sampleSentMessage.id}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>تاریخ ارسال:</span>{" "}
            {sampleSentMessage.sentDate}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>موضوع:</span>{" "}
            {sampleSentMessage.subject}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>اولویت:</span>{" "}
            <Chip
              label={sampleSentMessage.priority}
              size="small"
              sx={{
                backgroundColor: sampleSentMessage.priority === "فوری" ? "#ffebee" : "#e8f5e9",
                color: sampleSentMessage.priority === "فوری" ? "#c62828" : "#2e7d32",
                fontWeight: "medium",
                fontSize: "0.875rem"
              }}
            />
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>گیرنده:</span>{" "}
            {sampleSentMessage.receiver}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>وضعیت:</span>{" "}
            <Chip
              label={sampleSentMessage.status}
              size="small"
              sx={{
                backgroundColor: "#e3f2fd",
                color: "#1565c0",
                fontWeight: "medium",
                fontSize: "0.875rem"
              }}
            />
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            backgroundColor: "#f8fafc",
            p: 3,
            borderRadius: 2,
            lineHeight: 2,
            color: "#2d3748",
            border: "1px solid #e2e8f0",
            fontSize: "1rem",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "4px",
              height: "100%",
              backgroundColor: "#1976d2",
              borderRadius: "4px 0 0 4px",
            },
          }}
        >
          {sampleSentMessage.content}
        </Typography>
      </Paper>
    </Box>
  );
};

export default SentMessage;


