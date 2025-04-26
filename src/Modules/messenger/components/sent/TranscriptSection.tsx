import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import Transcript from "./sent_transcript";

interface TranscriptSectionProps {
  transcriptItems: {
    id: string;
    enabled: boolean;
    transcript_for: string;
  }[];
  selectedTranscript: string[];
  transcriptDirections: { [id: string]: string };
  internalUserOptions: { label: string; value: string }[];
  getTranscriptName: (id: string) => string;
  setSelectedTranscript: (transcripts: string[]) => void;
  handleAddTranscript: () => void;
  handleTranscriptToggle: (id: string) => void;
  setTranscriptDirection: (id: string, direction: string) => void;
}

const TranscriptSection: React.FC<TranscriptSectionProps> = ({
  transcriptItems,
  selectedTranscript,
  transcriptDirections,
  internalUserOptions,
  getTranscriptName,
  setSelectedTranscript,
  handleAddTranscript,
  handleTranscriptToggle,
  setTranscriptDirection,
}) => {
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
        transcript={transcriptItems}
        selectedTranscript={selectedTranscript}
        setSelectedTranscript={setSelectedTranscript}
        handleAddTranscript={handleAddTranscript}
        handleTranscriptToggle={handleTranscriptToggle}
        internalUserOptions={internalUserOptions}
        getTranscriptName={getTranscriptName}
        transcriptDirections={transcriptDirections}
        setTranscriptDirection={setTranscriptDirection}
      />
    </Grid>
  );
};

export default TranscriptSection; 