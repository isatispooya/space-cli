import React from "react";
import { Typography, ListItem, Grid } from "@mui/material";
import { ReferenceDetailType } from "../../types/sent/transcript.type";

interface ReferenceListItemType {
  item: ReferenceDetailType;
  onToggle?: (id: number) => void;
  getTranscriptName?: (position: number) => string;
}

const ReferenceListItem: React.FC<ReferenceListItemType> = ({ item }) => {
  return (
    <ListItem sx={{ px: 1, py: 1.5 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={8}>
          <Typography sx={{ fontSize: "0.9rem", color: "#1e293b" }}>
            {item.user?.first_name} {item.user?.last_name} |{" "}
            {item.position || item.name || "بدون پوزیشن"} |{" "}
            {item.company_detail?.name || item.company_name || "-"}
          </Typography>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography sx={{ fontSize: "0.8rem", color: "#64748b" }}>
            {item.transcript_for || "اطلاع رسانی"}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

export default ReferenceListItem;
