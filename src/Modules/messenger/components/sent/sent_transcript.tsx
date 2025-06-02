import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  Grid,
  Chip,
  Divider,
  TextField,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { MultiSelect } from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import internalOptions from "../../data/sent/transcript.data";
import TranscriptListItem from "./TranscriptListItem";
import {
  ITranscriptResponseType,
  TranscriptPropsType,
} from "../../types/sent/transcript.type";
import { useSentFormStore } from "../../store/sent/sent.store";

const Transcript: React.FC<TranscriptPropsType> = React.memo(
  ({
    transcript,
    selectedTranscript,
    setSelectedTranscript,
    handleAddTranscript,
    handleTranscriptToggle,
    internalUserOptions,
    getTranscriptName,
    transcriptDirections,
    setTranscriptDirection,
    onDeleteTranscript,
    data,
  }) => {
    const [localTranscript, setLocalTranscript] = useState<
      ITranscriptResponseType[]
    >([]);

    const { handleDeleteTranscriptFromStore } = useSentFormStore();

    useEffect(() => {
      const allTranscripts = [...transcript];
      if (data?.transcript) {
        data.transcript.forEach((detail) => {
          if (!allTranscripts.some((t) => t.position === detail.position)) {
            allTranscripts.push(detail);
          }
        });
      }
      setLocalTranscript(allTranscripts);
    }, [transcript, data?.transcript]);

    const handleDirectionChange = useCallback(
      (id: number, value: string) => {
        setTranscriptDirection(id, value);
      },
      [setTranscriptDirection]
    );
    const handleDeleteTranscript = useCallback(
      (id: number) => {
        const isExternal = id < 0;

        setLocalTranscript((prev) =>
          prev.filter((item) => {
            if (isExternal) {
              return item.id !== id;
            } else {
              return item.position !== id;
            }
          })
        );

        handleDeleteTranscriptFromStore(id);

        const newSelectedTranscript = selectedTranscript.filter(
          (selectedId) => selectedId !== id.toString()
        );
        setSelectedTranscript(newSelectedTranscript);

        if (onDeleteTranscript) {
          onDeleteTranscript(id);
        }
      },
      [
        onDeleteTranscript,
        handleDeleteTranscriptFromStore,
        setSelectedTranscript,
        selectedTranscript,
      ]
    );

    const [externalTranscriptText, setExternalTranscriptText] = useState("");

    useEffect(() => {
      if (data?.transcript && data.transcript.length > 0) {
        const positions = data.transcript
          .map((t) => t.position?.toString())
          .filter((p): p is string => p !== undefined);

        data.transcript.forEach((t: ITranscriptResponseType) => {
          if (t.position && t.transcript_for) {
            setTranscriptDirection(t.position, t.transcript_for);
          }
        });

        setSelectedTranscript(positions);
      }
    }, [data?.transcript]);

    const [recipientType, setRecipientType] = useState<"internal" | "external">(
      "internal"
    );

    const internalTranscripts = localTranscript.filter(
      (t) => !t.isExternal && !t.user_external && t.id >= 0
    );
    const externalTranscripts = localTranscript.filter(
      (t) => t.isExternal || t.user_external || t.id < 0
    );

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: "1px solid #e0e0e0",
          p: 2,
          borderRadius: 2,
          bgcolor: "#fafafa",
          boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <FormControlLabel
            control={
              <Switch
                checked={recipientType === "external"}
                onChange={() =>
                  setRecipientType(
                    recipientType === "internal" ? "external" : "internal"
                  )
                }
                color="primary"
              />
            }
            label={
              recipientType === "internal" ? "گیرندگان داخلی" : "گیرندگان خارجی"
            }
            labelPlacement="start"
            sx={{ mr: 2 }}
          />
        </Box>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <div style={{ display: "flex", gap: 10 }}>
              {recipientType === "internal" && (
                <MultiSelect
                  label="انتخاب گیرندگان رونوشت"
                  selectedValues={selectedTranscript}
                  onChange={(value) => {
                    const filteredValues = value.filter((v) => v !== "");
                    setSelectedTranscript(filteredValues);
                  }}
                  options={internalUserOptions}
                />
              )}
              {recipientType === "external" && (
                <Grid
                  item
                  xs={12}
                  sm={4}
                  sx={{ width: "100%", marginTop: "25px" }}
                >
                  <TextField
                    label="گیرندگان رونوشت خارجی"
                    value={externalTranscriptText}
                    onChange={(e) => setExternalTranscriptText(e.target.value)}
                    placeholder="نام گیرنده رونوشت خارجی را وارد کنید"
                    variant="outlined"
                    size="small"
                    fullWidth
                    sx={{
                      borderRadius: 1.5,
                      boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                    }}
                  />
                </Grid>
              )}
            </div>
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <ButtonBase
                label="افزودن"
                onClick={() => {
                  if (
                    recipientType === "internal" &&
                    selectedTranscript.length > 0
                  ) {
                    handleAddTranscript();
                  }
                  if (
                    recipientType === "external" &&
                    externalTranscriptText.trim() !== ""
                  ) {
                    handleAddTranscript(externalTranscriptText.trim());
                  }
                }}
                bgColor="#1976d2"
                hoverColor="#1565c0"
              />
            </Box>
          </Grid>
        </Grid>
        {(recipientType === "internal"
          ? internalTranscripts.length
          : externalTranscripts.length) > 0 && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Chip
                label={
                  recipientType === "internal"
                    ? internalTranscripts.length
                    : externalTranscripts.length
                }
                size="small"
                color="primary"
                sx={{ fontWeight: "bold", height: 22, minWidth: 22 }}
              />
              گیرنده رونوشت انتخاب شده است
            </Typography>
          </Box>
        )}
        {(recipientType === "internal"
          ? internalTranscripts.length
          : externalTranscripts.length) > 0 && (
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
              {(recipientType === "internal"
                ? internalTranscripts
                : externalTranscripts
              ).map((item, index, arr) => (
                <React.Fragment key={item.position ?? item.id}>
                  <TranscriptListItem
                    item={item}
                    getTranscriptName={getTranscriptName}
                    transcriptDirections={transcriptDirections}
                    handleDirectionChange={handleDirectionChange}
                    handleTranscriptToggle={handleTranscriptToggle}
                    internalOptions={internalOptions}
                    onDelete={handleDeleteTranscript}
                  />
                  {index < arr.length - 1 && <Divider sx={{ my: 0.5 }} />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    );
  }
);

export default Transcript;
