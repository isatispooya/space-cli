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

  const matchedPosition = allposition?.find(
    (pos) => pos?.user?.id === senderUser?.id
  );

  const signatureImageUrl = matchedPosition?.signature as string | undefined;
  const sealImageUrl = (sender?.sender_details?.company_detail?.seal || null) as string | null;

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

  const showSeal = sender.published && ("seal" in sender ? sender.seal : false);
  const showSignature =
    sender.published && ("signature" in sender ? sender.signature : false);

  const renderSealAndSignature = () => {
    return (
      <div style={{ display: "flex", flexDirection: "row", gap: "16px", alignItems: "center" }}>
        {showSeal && sealImageUrl ? (
          <img
            src={`${server}${sealImageUrl}`}
            alt="مهر شرکت"
            style={{
              maxWidth: "160px",
              height: "auto",
            }}
          />
        ) : null}

        {showSignature && signatureImageUrl ? (
          <img
            src={`${server}${signatureImageUrl}`}
            alt="امضا"
            style={{
              maxWidth: "120px",
              height: "auto",
            }}
          />
        ) : null}
      </div>
    );
  };

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
            {renderSealAndSignature()}
          </Box>
        </Grid>
      )}
    </Grid>
  );
};
