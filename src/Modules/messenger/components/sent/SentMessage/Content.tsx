import { Box, Grid, Typography } from "@mui/material";
import { MessageContentPropsType } from "../../../types/sent/sent.type";
import { server } from "@/api";
export const MessageContent = ({
  sender,
  allposition,
}: MessageContentPropsType) => {
  const senderUser = sender?.sender_details?.user;
  const receiverInternal = sender?.receiver_internal_details;
  const senderCompany = sender?.sender_details?.company_detail?.name;

  // پیدا کردن موقعیت کاربر فرستنده برای دریافت امضا و مهر
  const matchedPosition = allposition?.find(
    (pos) => pos?.user?.id === senderUser?.id
  );
  
  // آدرس تصاویر مهر و امضا
  const signatureImageUrl = matchedPosition?.signature;
  // از آنجا که seal در تایپ companyDetail تعریف نشده، باید از ts-expect-error استفاده کنیم
  // @ts-expect-error - در داده‌های واقعی، این فیلد وجود دارد
  const sealImageUrl = sender?.sender_details?.company_detail?.seal || null;

  const senderFullName = `${senderUser?.first_name || ""} ${
    senderUser?.last_name || ""
  } ${sender?.sender_details?.name || ""} ${senderCompany || ""}`;
  const receiverFullName = sender.is_internal
    ? `${receiverInternal?.user?.first_name || ""} ${
        receiverInternal?.user?.last_name || ""
      } ${receiverInternal?.name || ""} ${
        receiverInternal?.company_detail?.name || ""
      }`
    : sender.receiver_external;

  // شرط‌های نمایش مهر و امضا
  const showSeal = ('seal' in sender ? sender.seal : false);
  const showSignature = ('signature' in sender ? sender.signature : false);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Box sx={{ borderRadius: 2, p: 2.5 }}>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            از: {senderFullName}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            به: {receiverFullName}
          </Typography>
          <Typography sx={{ fontSize: "1rem", fontWeight: 600, mb: 1 }}>
            موضوع: {sender.subject}
          </Typography>
        </Box>
      </Grid>

      {sender.is_internal && (
        <Grid
          item
          xs={12}
          sx={{ display: "flex", justifyContent: "flex-end", mr: 12.5 }}
        >
          <Box sx={{ borderRadius: 1.5 }}>
            <Typography
              sx={{
                fontSize: { xs: "0.90rem", sm: ".95rem" },
                lineHeight: 1.8,
                color: "text.primary",
                textAlign: "center",
                marginBottom: 1,
              }}
            >
              مهر و امضا
            </Typography>
            {/* نمایش مهر و امضا در یک ردیف */}
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2, alignItems: 'center' }}>
              {showSeal && sealImageUrl && (
                <img 
                  src={server + sealImageUrl} 
                  alt="مهر شرکت" 
                  style={{ 
                    maxWidth: "160px", 
                    height: "auto" 
                  }} 
                />
              )}
              
              {showSignature && signatureImageUrl && (
                <img 
                  src={server + signatureImageUrl} 
                  alt="امضا" 
                  style={{ 
                    maxWidth: "120px", 
                    height: "auto" 
                  }} 
                />
              )}
            </Box>
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
