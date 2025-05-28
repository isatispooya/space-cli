import React, { useEffect, useState } from "react";
import {
  Typography,
  ListItem,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { SelectInput } from "../../../../components/common/inputs";
import { TranscriptListItemPropsType } from "../../types/sent/transcript.type";

type ExtendedTranscriptListItemPropsType = TranscriptListItemPropsType & {
  onAddExternalRecipient?: (id: number, newRecipient: string) => void;
  onDelete?: (id: number) => void;
};

const TranscriptListItem: React.FC<ExtendedTranscriptListItemPropsType> =
  React.memo(
    ({
      item,
      getTranscriptName,
      transcriptDirections,
      handleDirectionChange,
      handleTranscriptToggle,
      internalOptions,
      onDelete,
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
      const directionValue =
        transcriptDirections[item.position || item.id] || "";

      return (
        <ListItem sx={{ px: 1, py: 1.5 }}>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={4}>
              {!isExternalTranscript ? (
                <>
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "#64748b", mb: 2 }}
                  >
                    گیرندگان داخلی
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#1e293b" }}>
                    {getTranscriptName(item.position || item.id)}
                  </Typography>
                </>
              ) : (
                <>
                  <Typography
                    sx={{ fontSize: "0.75rem", color: "#64748b", mb: 2 }}
                  >
                    گیرندگان خارجی
                  </Typography>
                  <Typography sx={{ fontSize: "0.9rem", color: "#1e293b" }}>
                    {externalTexts.join("، ")}
                  </Typography>
                </>
              )}
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mb: 2 }}>
                نوع رونوشت
              </Typography>

              <SelectInput
                label=""
                options={internalOptions}
                value={directionValue}
                onChange={(val) =>
                  handleDirectionChange(item.position || item.id, val)
                }
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Typography sx={{ fontSize: "0.75rem", color: "#64748b", mb: 2 }}>
                وضعیت نمایش در نامه
              </Typography>
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
            <Grid
              item
              xs={12}
              md={1}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={() => onDelete?.(item.position || item.id)}
                sx={{
                  color: "#ef4444",
                  "&:hover": {
                    backgroundColor: "rgba(239, 68, 68, 0.04)",
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </ListItem>
      );
    }
  );

export default TranscriptListItem;
