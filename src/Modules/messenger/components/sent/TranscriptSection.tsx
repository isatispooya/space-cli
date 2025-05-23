import React from "react";
import { Grid, Typography, Divider } from "@mui/material";
import Transcript from "./sent_transcript";
import { ITranscriptResponseType } from "../../types/sent/sent.type";

interface TranscriptSectionPropsType {
  transcriptItems: ITranscriptResponseType[];
  selectedTranscript: string[];
  transcriptDirections: { [id: number]: string };
  internalUserOptions: { label: string; value: string }[];
  getTranscriptName: (id: number) => string;
  setSelectedTranscript: (transcripts: string[]) => void;
  handleAddTranscript: (text?: string) => void;
  handleTranscriptToggle: (id: number) => void;
  setTranscriptDirection: (id: number, direction: string) => void;
  is_internal?: boolean;
}

const TranscriptSection: React.FC<TranscriptSectionPropsType> = ({
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
        is_internal={is_internal}
      />
    </Grid>
  );
};

export default TranscriptSection;
