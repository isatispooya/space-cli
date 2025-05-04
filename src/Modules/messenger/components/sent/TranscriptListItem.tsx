import React, { useCallback } from "react";
import {
  Typography,
  ListItem,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Box,
} from "@mui/material";
import { SelectInput } from "../../../../components/common/inputs";
import internalOptions from "../../data/sent/transcript.data";
import { ITranscriptResponse } from "../../types/sent/sent.type";

interface TranscriptListItemProps {
  item: ITranscriptResponse;
  getTranscriptName: (id: number) => string;
  transcriptDirections: { [id: number]: string };
  handleDirectionChange: (id: number, value: string) => void;
  handleTranscriptToggle: (id: number) => void;
  internalOptions: typeof internalOptions;
}

const TranscriptListItem: React.FC<TranscriptListItemProps> = React.memo(
  ({
    item,
    getTranscriptName,
    transcriptDirections,
    handleDirectionChange,
    handleTranscriptToggle,
    internalOptions,
  }) => {
    const handleVisibilityChange = useCallback(
      (_: React.SyntheticEvent, checked: boolean) => {
        if (checked !== !item.security) {
          handleTranscriptToggle(item.id);
        }
      },
      [item.security, item.id, handleTranscriptToggle]
    );

    return (
      <ListItem sx={{ px: 1, py: 1.5 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography
              sx={{ fontWeight: 500, color: "#1e293b", fontSize: "0.9rem" }}
            >
              {getTranscriptName(item.id)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            <SelectInput
              label="جهت رونوشت"
              value={
                transcriptDirections[item.id] ||
                item.transcript_for ||
                "notification"
              }
              options={internalOptions}
              onChange={(value) => handleDirectionChange(item.id, value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 1,
              }}
            >
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue={!item.security ? "true" : "false"}
                  name="radio-buttons-group"
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="نمایش"
                    onChange={handleVisibilityChange}
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="مخفی"
                    onChange={handleVisibilityChange}
                  />
                </RadioGroup>
              </FormControl>
            </Box>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
);

export default TranscriptListItem;
