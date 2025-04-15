import { Box, Typography, Paper, Chip } from "@mui/material";

const sampleMessage = {
  id: "123445678",
  subject: "درخواست همکاری",
  sender: "علی محمدی",
  receivedDate: "۱۴۰۳/۰۱/۱۵ - ۱۴:۳۰",
  priority: "عادی",
  department: "منابع انسانی",
  status: "خوانده شده",
  content:
    "با سلام و احترام، امیدوارم حال شما خوب باشد. من علی محمدی هستم و برای موقعیت شغلی اعلام شده درخواست همکاری دارم.",
};

const ShowMessage = () => {
  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          نامه جدید
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
            {sampleMessage.id}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>تاریخ دریافت:</span>{" "}
            {sampleMessage.receivedDate}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>موضوع:</span>{" "}
            {sampleMessage.subject}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>اولویت:</span>{" "}
            {sampleMessage.priority}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>ارسال کننده:</span>{" "}
            {sampleMessage.sender}
          </Typography>
          <Typography
            variant="body1"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <span style={{ fontWeight: "bold" }}>وضعیت:</span>{" "}
            <Chip
              label={sampleMessage.status}
              size="small"
              sx={{
                backgroundColor:
                  sampleMessage.status === "خوانده شده" ? "#e8f5e9" : "#fff3e0",
                color:
                  sampleMessage.status === "خوانده شده" ? "#2e7d32" : "#ed6c02",
                fontWeight: "medium",
                fontSize: "0.875rem",
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
          {sampleMessage.content}
        </Typography>
      </Paper>
    </Box>
  );
};

export default ShowMessage;
