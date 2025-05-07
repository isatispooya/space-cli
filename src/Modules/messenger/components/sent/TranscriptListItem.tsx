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
  Tooltip,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
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
  handleExternalTextUpdate?: (id: number, text: string | string[]) => void;
}

const TranscriptListItem: React.FC<TranscriptListItemProps> = React.memo(
  ({
    item,
    getTranscriptName,
    transcriptDirections,
    handleDirectionChange,
    handleTranscriptToggle,
    internalOptions,
    handleExternalTextUpdate,
  }) => {
    const [visibility, setVisibility] = useState(!item.security);
    const isExternalTranscript = item.id < 0 || item.external_text;
    const [externalTexts, setExternalTexts] = useState<string[]>(
      isExternalTranscript && item.external_text 
        ? Array.isArray(item.external_text) 
          ? item.external_text 
          : [item.external_text]
        : [""]
    );

    useEffect(() => {
      setVisibility(!item.security);
    }, [item.security]);

    useEffect(() => {
      if (isExternalTranscript && item.external_text) {
        setExternalTexts(
          Array.isArray(item.external_text) 
            ? item.external_text 
            : [item.external_text]
        );
      }
    }, [item.external_text, isExternalTranscript]);

    const handleVisibilityChange = (
      event: React.ChangeEvent<HTMLInputElement>
    ) => {
      const value = event.target.value === "true";
      setVisibility(value);
      handleTranscriptToggle(item.id, !value);
    };

    const handleExternalTextChange = (index: number, value: string) => {
      const newTexts = [...externalTexts];
      newTexts[index] = value;
      setExternalTexts(newTexts);
      if (handleExternalTextUpdate) {
        handleExternalTextUpdate(item.id, newTexts);
      }
    };

    const addExternalText = () => {
      setExternalTexts([...externalTexts, ""]);
    };

    const removeExternalText = (index: number) => {
      if (externalTexts.length > 1) {
        const newTexts = externalTexts.filter((_, i) => i !== index);
        setExternalTexts(newTexts);
        if (handleExternalTextUpdate) {
          handleExternalTextUpdate(item.id, newTexts);
        }
      }
    };

    return (
      <ListItem sx={{ px: 1, py: 1.5 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            {isExternalTranscript ? (
              <Box>
                <Typography
                  sx={{ 
                    fontWeight: 500, 
                    color: "#1e293b", 
                    fontSize: "0.9rem",
                    mb: 1
                  }}
                >
                  <Tooltip title="رونوشت گیرنده خارجی" placement="top">
                    <span>رونوشت خارجی</span>
                  </Tooltip>
                </Typography>
                {externalTexts.map((text, index) => (
                  <Box 
                    key={index} 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      mb: 1
                    }}
                  >
                    <TextField
                      fullWidth
                      size="small"
                      value={text}
                      onChange={(e) => handleExternalTextChange(index, e.target.value)}
                      placeholder="متن رونوشت خارجی"
                      sx={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: 1,
                        '& .MuiOutlinedInput-root': {
                          '& fieldset': {
                            borderColor: '#dee2e6',
                            borderStyle: 'dashed',
                          },
                        },
                      }}
                    />
                    <IconButton 
                      size="small" 
                      onClick={() => removeExternalText(index)}
                      sx={{ ml: 1 }}
                      disabled={externalTexts.length <= 1}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
                <IconButton 
                  size="small" 
                  onClick={addExternalText}
                  sx={{ 
                    mt: 1,
                    border: '1px dashed #dee2e6',
                    borderRadius: 1
                  }}
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>
            ) : (
              <Typography
                sx={{ fontWeight: 500, color: "#1e293b", fontSize: "0.9rem" }}
              >
                {getTranscriptName(item.id)}
              </Typography>
            )}
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
