import { Box, Button, Typography, Alert } from "@mui/material";
import { useEffect, useState } from "react";

const PaymentPage = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const extractedUrl = searchParams.get("url");
    setUrl(extractedUrl || "");
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
          borderRadius: 4,
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
          maxWidth: 700,
          width: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "#1a237e",
            marginBottom: 3,
            fontWeight: 700,
          }}
        >
          درگاه پرداخت امن
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: "#424242",
            marginBottom: 4,
            lineHeight: 1.8,
          }}
        >
          به درگاه پرداخت امن خوش آمدید. لطفاً قبل از ادامه، موارد زیر را با دقت مطالعه فرمایید:
        </Typography>

        <Alert 
          severity="warning" 
          sx={{ 
            marginBottom: 3,
            textAlign: 'right',
            '& .MuiAlert-message': {
              width: '100%'
            }
          }}
        >
          <Typography variant="body2" component="div">
            لطفاً قبل از ورود به درگاه، از خاموش بودن VPN خود اطمینان حاصل کنید.
            در صورت روشن بودن VPN، ممکن است در فرآیند پرداخت با مشکل مواجه شوید.
          </Typography>
        </Alert>

        <Box sx={{ marginBottom: 4 }}>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              marginBottom: 2,
              textAlign: 'right'
            }}
          >
            • مبلغ پرداختی پس از تأیید، به صورت مستقیم به حساب فروشنده واریز خواهد شد.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              marginBottom: 2,
              textAlign: 'right'
            }}
          >
            • در صورت بروز هرگونه مشکل در پرداخت، می‌توانید با پشتیبانی تماس بگیرید.
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "#666",
              textAlign: 'right'
            }}
          >
            • لطفاً از صحت اطلاعات کارت بانکی خود اطمینان حاصل کنید.
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
            fontSize: "1.1rem",
            borderRadius: "12px",
            textTransform: "none",
            fontWeight: 600,
            boxShadow: "0 4px 12px rgba(46, 125, 50, 0.2)",
            "&:hover": {
              backgroundColor: "#1b5e20",
              boxShadow: "0 6px 16px rgba(46, 125, 50, 0.3)",
            },
          }}
        >
          ورود به درگاه پرداخت
        </Button>

        <Typography
          variant="caption"
          sx={{
            display: "block",
            marginTop: 3,
            color: "#757575",
          }}
        >
          این درگاه با استفاده از پروتکل‌های امنیتی SSL/TLS محافظت می‌شود
        </Typography>
      </Box>
    </Box>
  );
};

export default PaymentPage;