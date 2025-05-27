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
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectInput } from "../../../../components/common/inputs";
import { TranscriptListItemPropsType } from "../../types/sent/transcript.type";

const TranscriptListItem: React.FC<TranscriptListItemPropsType> = React.memo(
  ({
    item,
    getTranscriptName,
    transcriptDirections,
    handleDirectionChange,
    handleTranscriptToggle,
    internalOptions,
  }) => {
    const [visibility, setVisibility] = useState(!item.security);
    const isExternalTranscript =
      item.isExternal || item.external_text || item.id < 0;

    const [externalTexts, setExternalTexts] = useState<string[]>(
      isExternalTranscript && (item.external_text || item.name)
        ? Array.isArray(item.external_text)
          ? item.external_text
          : [item.external_text || item.name || ""]
        : [""]
    );

    const [newExternalText, setNewExternalText] = useState("");

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
      handleTranscriptToggle(item.position || item.id);
    };

    const handleAddExternalText = () => {
      const trimmed = newExternalText.trim();
      if (trimmed !== "") {
        setExternalTexts([...externalTexts, trimmed]);
        setNewExternalText("");
      }
    };

    const handleDeleteExternalText = (index: number) => {
      const newTexts = [...externalTexts];
      newTexts.splice(index, 1);
      setExternalTexts(newTexts);
    };

    const directionValue = transcriptDirections[item.position || item.id] || "";

    return (
      <ListItem sx={{ px: 1, py: 1.5 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Typography sx={{ fontSize: "0.9rem", color: "#1e293b" }}>
              {isExternalTranscript
                ? externalTexts.join("، ")
                : getTranscriptName(item.position || item.id)}
            </Typography>
          </Grid>

          <Grid item xs={12} md={4}>
            {isExternalTranscript ? (
              <Box>
                {externalTexts.map((text, idx) => (
                  <Box
                    key={idx}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1,
                      gap: 1,
                    }}
                  >
                    <TextField
                      value={text}
                      size="small"
                      variant="outlined"
                      fullWidth
                      disabled
                    />
                    <Tooltip title="حذف">
                      <IconButton
                        onClick={() => handleDeleteExternalText(idx)}
                        size="small"
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </Box>
                ))}

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    mt: 1,
                  }}
                >
                  <TextField
                    value={newExternalText}
                    onChange={(e) => setNewExternalText(e.target.value)}
                    placeholder="افزودن گیرنده جدید"
                    size="small"
                    variant="outlined"
                    fullWidth
                  />
                  <Tooltip title="افزودن">
                    <IconButton
                      onClick={handleAddExternalText}
                      color="primary"
                      size="small"
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ) : (
              <SelectInput
                label="نوع رونوشت"
                options={internalOptions}
                value={directionValue}
                onChange={(val) =>
                  handleDirectionChange(item.position || item.id, val)
                }
              />
            )}
          </Grid>

          <Grid item xs={12} md={4}>
            <FormControl component="fieldset">
              <RadioGroup
                row
                value={visibility.toString()}
                onChange={handleVisibilityChange}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio size="small" />}
                  label="قابل مشاهده"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio size="small" />}
                  label="محرمانه"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </ListItem>
    );
  }
);

export default TranscriptListItem;
