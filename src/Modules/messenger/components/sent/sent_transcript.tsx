import React, { useCallback } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Grid,
  Chip,
  Divider,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { MultiSelect, SelectInput } from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import internalOptions from "../../data/sent/transcript.data";

interface TranscriptItem {
  id: string;
  enabled: boolean;
  transcript_for?: string;
}

interface ReferenceDetail {
  id: string;
  user?: {
    first_name: string;
    last_name: string;
  };
  transcript_for?: string;
}

interface TranscriptProps {
  transcript: TranscriptItem[];
  selectedTranscript: string[];
  setSelectedTranscript: (value: string[]) => void;
  handleAddTranscript: () => void;
  handleTranscriptToggle: (id: string) => void;
  internalUserOptions: { label: string; value: string }[];
  getTranscriptName: (id: string) => string;
  transcriptDirections: { [id: string]: string };
  setTranscriptDirection: (id: string, value: string) => void;
  data?: {
    sender?: {
      reference_details: ReferenceDetail[];
    };
  };
}

const TranscriptListItem: React.FC<{
  item: TranscriptItem;
  getTranscriptName: (id: string) => string;
  transcriptDirections: { [id: string]: string };
  handleDirectionChange: (id: string, value: string) => void;
  handleTranscriptToggle: (id: string) => void;
  internalOptions: typeof internalOptions;
}> = React.memo(
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
        if (checked !== item.enabled) {
          handleTranscriptToggle(item.id);
        }
      },
      [item.enabled, item.id, handleTranscriptToggle]
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
                  defaultValue="female"
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

const Transcript: React.FC<TranscriptProps> = React.memo(
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
    data,
  }) => {
    const handleDirectionChange = useCallback(
      (id: string, value: string) => {
        setTranscriptDirection(id, value);
      },
      [setTranscriptDirection]
    );

    const handleAdd = useCallback(() => {
      if (selectedTranscript.length > 0) {
        handleAddTranscript();
        setSelectedTranscript([]);
      }
    }, [selectedTranscript, handleAddTranscript, setSelectedTranscript]);

    const hasReferenceData =
      data?.sender?.reference_details &&
      data.sender.reference_details.length > 0;

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
        {/* بخش افزودن رونوشت جدید */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <MultiSelect
              label="انتخاب گیرندگان رونوشت"
              selectedValues={selectedTranscript}
              onChange={(value) => setSelectedTranscript(value)}
              options={internalUserOptions}
            />
          </Grid>
          <Grid item xs={2}>
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
              <ButtonBase
                label="افزودن"
                onClick={handleAdd}
                bgColor="#1976d2"
                hoverColor="#1565c0"
              />
            </Box>
          </Grid>
        </Grid>

        {/* نمایش تعداد رونوشت‌ها */}
        {transcript.length > 0 && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Chip
                label={transcript.length}
                size="small"
                color="primary"
                sx={{ fontWeight: "bold", height: 22, minWidth: 22 }}
              />
              گیرنده رونوشت انتخاب شده است
            </Typography>
          </Box>
        )}

        {/* نمایش لیست رونوشت‌های دریافتی از دیتا */}
        {hasReferenceData && (
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: "#fff",
              boxShadow: "rgba(0, 0, 0, 0.05) 0px 1px 2px",
              mb: 2,
            }}
          >
            <Typography
              variant="body2"
              sx={{ mb: 1, fontWeight: "medium", color: "#555" }}
            >
              رونوشت‌های موجود:
            </Typography>
            <List sx={{ p: 0 }}>
              {data?.sender?.reference_details?.map(
                (item: ReferenceDetail, index: number) => (
                  <React.Fragment key={`ref-${item.id}`}>
                    <ListItem sx={{ px: 1, py: 1.5 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                          <Typography
                            sx={{ fontSize: "0.9rem", color: "#1e293b" }}
                          >
                            {item.user?.first_name} {item.user?.last_name}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={4}>
                          <Typography
                            sx={{ fontSize: "0.8rem", color: "#64748b" }}
                          >
                            {item.transcript_for || "اطلاع رسانی"}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                    {index <
                      (data?.sender?.reference_details?.length || 0) - 1 && (
                      <Divider sx={{ my: 0.5 }} />
                    )}
                  </React.Fragment>
                )
              )}
            </List>
          </Paper>
        )}

        {/* لیست رونوشت‌ها */}
        {transcript.length > 0 && (
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
              {transcript.map((item, index) => (
                <React.Fragment key={item.id}>
                  <TranscriptListItem
                    item={item}
                    getTranscriptName={getTranscriptName}
                    transcriptDirections={transcriptDirections}
                    handleDirectionChange={handleDirectionChange}
                    handleTranscriptToggle={handleTranscriptToggle}
                    internalOptions={internalOptions}
                  />
                  {index < transcript.length - 1 && (
                    <Divider sx={{ my: 0.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        )}

        {transcript.length === 0 && !hasReferenceData && (
          <Box sx={{ p: 2, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              هیچ گیرنده رونوشتی انتخاب نشده است. از لیست بالا گیرندگان را
              انتخاب و اضافه کنید.
            </Typography>
          </Box>
        )}
      </Box>
    );
  }
);

export default Transcript;
