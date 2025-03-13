import { Box, Button, Typography } from "@mui/material";
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
        height: "100vh",
        backgroundColor: "#f5f5f5",
        padding: 2,
        overflow: "hidden",
      }}
    >   
      <Box
        sx={{
          position: "relative",
          padding: 6,
          borderRadius: 2,
          textAlign: "center",
          backgroundColor: "#fff",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          maxWidth: 600,
          width: "100%",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "#333",
            marginBottom: 2,
            fontWeight: 500,
          }}
        >
          لطفاً قبل از ورود به درگاه، VPN خود را خاموش کنید
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            window.location.href = `${url}`;
          }}
          sx={{
            backgroundColor: "#00796b",
            color: "#fff",
            padding: "10px 24px",
            fontSize: "1rem",
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#004d40",
            },
          }}
        >
          پرداخت
        </Button>
      </Box>
    </Box>
  );
};

export default PaymentPage;