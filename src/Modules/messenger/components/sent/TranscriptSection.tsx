import React, { memo, useMemo } from "react";
import { Grid, Typography, Divider } from "@mui/material";
import Transcript from "./sent_transcript";
import { TranscriptSectionPropsType, TranscriptItemType } from "@/Modules/messenger/types/sent/transcript.type";

const TranscriptSection: React.FC<TranscriptSectionPropsType> = memo(({
  transcriptItems,
  selectedTranscript,
  transcriptDirections,
  internalUserOptions,
  getTranscriptName,
  setSelectedTranscript,
  handleAddTranscript,
  handleTranscriptToggle,
  setTranscriptDirection,
  is_internal = true,
}) => {
  const mappedTranscriptItems = useMemo(() => 
    transcriptItems.map(item => ({
      ...item,
      user: { id: 0, first_name: "", last_name: "" },
      name: "",
      company_name: "",
      company_detail: { name: "" }
    }) as TranscriptItemType),
    [transcriptItems]
  );

  const transcriptData = useMemo(() => ({
    transcript_details: mappedTranscriptItems,
    sender: { reference_details: [] }
  }), [mappedTranscriptItems]);

  return (
    <Grid item xs={12}>
      <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
      <Typography
        variant="subtitle1"
        sx={{
          mb: { xs: 1, sm: 2 },
          fontWeight: "medium",
          color: "#555",
          fontSize: { xs: "0.9rem", sm: "1rem" },
        }}
      >
        رونوشت گیرندگان
      </Typography>
      <Transcript
        transcript={mappedTranscriptItems}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
        handleAddTranscript={handleAddTranscript}
        handleTranscriptToggle={handleTranscriptToggle}
        internalUserOptions={internalUserOptions}
        getTranscriptName={getTranscriptName}
        transcriptDirections={transcriptDirections}
        setTranscriptDirection={setTranscriptDirection}
        is_internal={is_internal}
        data={transcriptData}
      />
    </Grid>
  );
});

export default TranscriptSection;
