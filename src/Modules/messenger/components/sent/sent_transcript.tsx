import React from "react";
import {
  Box,
  Typography,
  Paper,
  Switch,
  List,
  ListItem,
  Grid,
  Chip,
  Divider,
} from "@mui/material";
import { MultiSelect, SelectInput } from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import internalOptions from "../../data/sent/transcript.data";

interface TranscriptItem {
  id: string;
  enabled: boolean;
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
}

const Transcript: React.FC<TranscriptProps> = ({
  transcript,
  selectedTranscript,
  setSelectedTranscript,
  handleAddTranscript,
  handleTranscriptToggle,
  internalUserOptions,
  getTranscriptName,
  transcriptDirections,
  setTranscriptDirection,
}) => {
  const handleDirectionChange = (id: string, value: string) => {
    setTranscriptDirection(id, value);
  };

  const handleAdd = () => {
    if (selectedTranscript.length > 0) {
      handleAddTranscript();
      setSelectedTranscript([]);
    }
  };

  return (
    <Box
      sx={{
        mb: 3,
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
                <ListItem sx={{ px: 1, py: 1.5 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Typography
                        sx={{
                          fontWeight: 500,
                          color: "#1e293b",
                          fontSize: "0.9rem",
                        }}
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
                          ""
                        }
                        options={internalOptions}
                        onChange={(value) =>
                          handleDirectionChange(item.id, value)
                        }
                      />
                    </Grid>

                    {/* وضعیت نمایش */}
                    <Grid item xs={12} md={4}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{ fontSize: "0.9rem", color: "#64748b" }}
                        >
                          {item.enabled ? "مخفی" : "نمایش"}
                        </Typography>
                        <Switch
                          checked={item.enabled}
                          onChange={() => handleTranscriptToggle(item.id)}
                          size="small"
                          sx={{
                            "& .MuiSwitch-switchBase.Mui-checked": {
                              color: "#3b82f6",
                            },
                            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                              {
                                backgroundColor: "#93c5fd",
                              },
                          }}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                </ListItem>
                {index < transcript.length - 1 && <Divider sx={{ my: 0.5 }} />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      )}

      {transcript.length === 0 && (
        <Box sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            هیچ گیرنده رونوشتی انتخاب نشده است. از لیست بالا گیرندگان را انتخاب
            و اضافه کنید.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Transcript;
