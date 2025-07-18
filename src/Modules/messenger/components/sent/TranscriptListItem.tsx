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
  Tooltip,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { SelectInput } from "../../../../components/common/inputs";
import { ExtendedTranscriptListItemPropsType } from "../../types/sent/transcript.type";

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
        item.isExternal || item.user_external || item.id < 0;

      const [externalTexts, setExternalTexts] = useState<string[]>(
        isExternalTranscript && (item.user_external || item.name)
          ? Array.isArray(item.user_external)
            ? item.user_external
            : [item.user_external || item.name || ""]
          : [""]
      );

      useEffect(() => {
        setVisibility(!item.security);
      }, [item.security]);

      useEffect(() => {
        if (isExternalTranscript && item.user_external) {
          setExternalTexts(
            Array.isArray(item.user_external)
              ? item.user_external
              : [item.user_external]
          );
        }
      }, [item.user_external, isExternalTranscript]);

      const handleVisibilityChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const value = event.target.value === "true";
        setVisibility(value);
        handleTranscriptToggle(item.position || item.id);
      };

      const directionKey = item.position ?? item.id;

      const directionValue =
        transcriptDirections[directionKey] ?? item.transcript_for ?? "";

      const handleDelete = () => {
        const idToDelete = isExternalTranscript ? item.id : (item.position ?? item.id);
        onDelete(idToDelete);
      };

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
                onChange={(val) => handleDirectionChange(directionKey, val)}
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
              <Tooltip title="حذف از لیست">
                <IconButton
                  onClick={handleDelete}
                  sx={{
                    color: "#64748b",
                    "&:hover": {
                      backgroundColor: "rgba(100, 116, 139, 0.04)",
                    },
                  }}
                >
                  <VisibilityOffIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ListItem>
      );
    }
  );

export default TranscriptListItem;
