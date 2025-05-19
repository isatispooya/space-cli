import React from "react";
import { Paper, List, Divider } from "@mui/material";
import TranscriptListItem from "./TranscriptListItem";
import {
  TranscriptListPropsType,
  ITranscriptResponseType,
} from "../../types/Transcript.Type";

const TranscriptList: React.FC<TranscriptListPropsType> = ({
  displayTranscript,
  getTranscriptName,
  transcriptDirections,
  handleDirectionChange,
  handleTranscriptToggle,
  internalOptions,
}) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        borderRadius: 2,
        bgcolor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px",
      }}
    >
      <List sx={{ p: 0 }}>
        {displayTranscript.map(
          (item: ITranscriptResponseType, index: number) => (
            <React.Fragment key={item.position || item.id}>
              <TranscriptListItem
                item={item}
                getTranscriptName={getTranscriptName}
                transcriptDirections={transcriptDirections}
                handleDirectionChange={handleDirectionChange}
                handleTranscriptToggle={handleTranscriptToggle}
                internalOptions={internalOptions}
              />
              {index < displayTranscript.length - 1 && (
                <Divider sx={{ my: 0.5 }} />
              )}
            </React.Fragment>
          )
        )}
      </List>
    </Paper>
  );
};

export default TranscriptList;
