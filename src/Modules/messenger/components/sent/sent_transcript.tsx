import { Box, Typography, Paper, Switch, List, ListItem } from "@mui/material";
import { MultiSelect, SelectInput } from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";

interface TranscriptProps {
  transcript: { id: string; enabled: boolean }[];
  selectedTranscript: string[];
  setSelectedTranscript: (value: string[]) => void;
  handleAddTranscript: () => void;
  handleTranscriptToggle: (id: string) => void;
  internalUserOptions: { label: string; value: string }[];
  getTranscriptName: (id: string) => string;
  handleChange: (name: string, value: string | string[]) => void;
  direction?: string;
}

const Transcript: React.FC<TranscriptProps> = ({
  transcript,
  selectedTranscript,
  setSelectedTranscript,
  handleAddTranscript,
  handleTranscriptToggle,
  internalUserOptions,
  getTranscriptName,
  handleChange,
  direction,
}) => {
  const handleAdd = () => {
    if (selectedTranscript.length > 0) {
      handleAddTranscript();
      setSelectedTranscript([]);
    }
  };

  const internalOptions = [
    {
      label: "اطلاع رسانی",
      value: "notification",
    },
    {
      label: "اطلاع",
      value: "information",
    },
    {
      label: "اقدام",
      value: "action",
    },
    {
      label: "بایگانی",
      value: "archive",
    },
    {
      label: "پیگیری",
      value: "tracking",
    },
  ];

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
      }}
    >
      <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 2 }}>
        <Box
          sx={{ flexGrow: 1, display: "flex", alignItems: "center", gap: 1 }}
        >
          <Box sx={{ width: "100%" }}>
            <MultiSelect
              label="رونوشت"
              selectedValues={selectedTranscript}
              onChange={(value) => setSelectedTranscript(value)}
              options={internalUserOptions}
            />
          </Box>
          <Box sx={{ mt: 4 }}>
            <ButtonBase
              label="+"
              onClick={handleAdd}
              bgColor="#1976d2"
              hoverColor="#1565c0"
            />
          </Box>
        </Box>
      </Box>

      {transcript.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2 }}>
          <List
            sx={{
              width: "100%",
              mt: 1,
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            {transcript.map((transcript) => (
              <ListItem
                key={transcript.id}
                sx={{
                  p: 1.5,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 500,
                      color: "#1e293b",
                      fontSize: "0.9rem",
                      flex: "0 0 200px",
                    }}
                  >
                    {getTranscriptName(transcript.id)}
                  </Typography>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      flex: 1,
                      justifyContent: "flex-end",
                    }}
                  >
                    <SelectInput
                      label="جهت"
                      value={direction}
                      options={internalOptions}
                      onChange={(value) => handleChange("direction", value)}
                    />

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        minWidth: "120px",
                      }}
                    >
                      <Typography
                        sx={{
                          fontSize: "0.8rem",
                          color: "#64748b",
                        }}
                      >
                        {transcript.enabled ? "مخفی" : "نمایش"}
                      </Typography>
                      <Switch
                        checked={transcript.enabled}
                        onChange={() => handleTranscriptToggle(transcript.id)}
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
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Transcript;
