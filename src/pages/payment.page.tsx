import { Box, Button, Typography, Alert } from "@mui/material";
import { useEffect, useState } from "react";

const PaymentPage = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const extractedUrl = searchParams.get("url");
    if (extractedUrl) {
      setUrl(extractedUrl);
    }
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
        padding: { xs: 2, md: 4 },
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          position: "relative",
          padding: { xs: 3, md: 6 },
          borderRadius: 6,
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
          maxWidth: 900,
          overflow: "hidden",
          width: "100%",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "4px",
            background: "linear-gradient(90deg, #1a237e 0%, #2e7d32 100%)",
            borderRadius: "6px 6px 0 0",
          },
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#1a237e",
            marginBottom: 3,
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "1.8rem" },
            textShadow: "0 1px 2px rgba(0,0,0,0.08)",
          }}
        >
          درگاه پرداخت امن
        </Typography>

        <Alert
          severity="warning"
          sx={{
            marginBottom: 3,
            textAlign: "right",
            borderRadius: 2,
            "& .MuiAlert-message": {
              width: "100%",
              fontSize: "0.9rem",
            },
            "& .MuiAlert-icon": {
              fontSize: "1.5rem",
            },
          }}
        >
          <Typography variant="body2" component="div" fontWeight={500}>
            لطفاً قبل از ورود به درگاه، از خاموش بودن VPN خود اطمینان حاصل کنید.
            در صورت روشن بودن VPN، ممکن است در فرآیند پرداخت با مشکل مواجه شوید.
          </Typography>
        </Alert>

        <Box
          sx={{
            marginBottom: 4,
            backgroundColor: "#f8f9fa",
            padding: 3,
            borderRadius: 3,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              marginBottom: 1.5,
              textAlign: "right",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              "&::before": {
                content: '"•"',
                color: "#2e7d32",
                fontSize: "1.2rem",
              },
            }}
          >
            مبلغ پرداختی پس از تأیید، به صورت مستقیم به حساب فروشنده واریز خواهد
            شد.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              marginBottom: 1.5,
              textAlign: "right",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              "&::before": {
                content: '"•"',
                color: "#2e7d32",
                fontSize: "1.2rem",
              },
            }}
          >
            در صورت بروز هرگونه مشکل در پرداخت، می‌توانید با پشتیبانی تماس
            بگیرید.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#555",
              textAlign: "right",
              fontSize: "0.95rem",
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              "&::before": {
                content: '"•"',
                color: "#2e7d32",
                fontSize: "1.2rem",
              },
            }}
          >
            لطفاً از صحت اطلاعات کارت بانکی خود اطمینان حاصل کنید.
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => {
            window.location.href = `${url}`;
          }}
          sx={{
            backgroundColor: "#2e7d32",
            color: "#fff",
            padding: "12px 36px",
            fontSize: "1rem",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "#1b5e20",
              boxShadow: "0 6px 14px rgba(46, 125, 50, 0.25)",
              transform: "translateY(-1px)",
            },
          }}
        >
          ورود به درگاه پرداخت
        </Button>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 0.5,
            marginTop: 3,
            padding: 1.5,
            borderTop: "1px solid #eee",
          }}
        >
          <Typography
            variant="caption"
            sx={{
              color: "#777",
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.8rem",
            }}
          >
            🔒 این درگاه با استفاده از پروتکل‌های امنیتی SSL/TLS محافظت می‌شود
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default PaymentPage;
