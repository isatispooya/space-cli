import { Box, Grid, Typography, Divider } from "@mui/material";
import { MessageHeaderPropsType } from "../../../types/sent/sent.type";

import { departmentOptions } from "../../../data/sent/sent.data";
import { getValueLabel } from "../../../utils/helpers";
import { server } from "@/api";

export const MessageHeader = ({
  sender,
  formattedDate,
}: MessageHeaderPropsType) => {
  return (
    <Box sx={{ position: "relative" }}>
      <Grid container>
        <Grid item xs={12}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: "bold",
                my: 1,
              }}
            >
              بسم تعالی
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              height: "150px",
              flexDirection: "row",
              alignItems: "center",
              p: 2,
            }}
          >
            <Box
              sx={{
                width: "150px",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={server + sender.sender_details?.company_detail?.logo}
                alt="logo"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            </Box>
            <Typography
              sx={{
                flex: 1,
                wordBreak: "break-word",
                overflow: "visible",
                fontWeight: "500",
              }}
            >
              {sender.sender_details?.company_detail?.name}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                alignItems: "flex-start",
                minWidth: "200px",
                marginLeft: "50px",
                "@media print": {
                  marginTop: "100px",
                },
              }}
            >
              <Typography>تاریخ : {formattedDate.split(" ")[0]}</Typography>
              <Typography>
                پیوست : {sender.attachments_details?.length || "ندارد"}
              </Typography>
              <Typography>شماره : {sender.number}</Typography>
              <Typography>
                طبقه بندی :{" "}
                {getValueLabel(sender.confidentiality_level, departmentOptions)}
              </Typography>
            </Box>
          </Box>
          <Divider sx={{ width: "100%", mb: 2 }} />
        </Grid>
      </Grid>
    </Box>
  );
};
