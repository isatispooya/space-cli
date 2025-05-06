import React, { useEffect, useState } from "react";
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
  handleTranscriptToggle: (id: number, newValue?: boolean) => void;
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
    const [visibility, setVisibility] = useState(!item.security);

    useEffect(() => {
      setVisibility(!item.security);
    }, [item.security]);

    const handleVisibilityChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value === "true";
      setVisibility(value);
      handleTranscriptToggle(item.id, !value);
    };

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
                  value={visibility ? "true" : "false"}
                  onChange={handleVisibilityChange}
                  row
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label="نمایش"
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label="مخفی"
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
