import { Box, Grid, Typography } from "@mui/material";
import { MessageHeaderProps } from "../../../types/sent/sent.type";

import { departmentOptions } from "../../../data/sent/sent.data";
import { getValueLabel } from "../../../utils/helpers";

export const MessageHeader = ({ sender, formattedDate }: MessageHeaderProps) => {
  return (
    <Box sx={{ mb: 4, position: "relative" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start", height: "100%", p: 2 }} />
        </Grid>
        <Grid item xs={12} md={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1, alignItems: "flex-start", p: 2 }}>
            <Typography>تاریخ : {formattedDate}</Typography>
            <Typography>پیوست : {sender.attachments_details?.length}</Typography>
            <Typography>شماره : {sender.number}</Typography>
            <Typography>
              طبقه بندی : {getValueLabel(sender.confidentiality_level, departmentOptions)}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}; 