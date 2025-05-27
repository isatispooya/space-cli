import React, { useCallback, useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  Grid,
  Chip,
  Divider,
  TextField,
} from "@mui/material";
import { MultiSelect } from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import internalOptions from "../../data/sent/transcript.data";
import TranscriptListItem from "./TranscriptListItem";
import { ITranscriptResponseType } from "../../types/sent/transcript.type";

interface ReferenceDetailType {
  id: string;
  user?: {
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
  name?: string;
  transcript_for?: string;
  position?: string;
  company_name?: string;
  company_detail?: {
    name: string;
  };
}

interface TranscriptPropsType {
  transcript: ITranscriptResponseType[];
  selectedTranscript: string[];
  setSelectedTranscript: (value: string[]) => void;
  handleAddTranscript: (text?: string) => void;
  handleTranscriptToggle: (id: number) => void;
  internalUserOptions: { label: string; value: string }[];
  getTranscriptName: (id: number) => string;
  transcriptDirections: { [id: number]: string };
  setTranscriptDirection: (id: number, value: string) => void;
  data?: {
    transcript?: ITranscriptResponseType[];
    sender?: {
      reference_details?: ReferenceDetailType[];
      subject?: string;
      text?: string;
      description?: string;
      is_internal?: boolean;
      postcript?: string;
      seal?: boolean;
      signature?: boolean;
      letterhead?: boolean;
      binding?: boolean;
      confidentiality_level?: string;
      priority?: string;
      kind_of_correspondence?: string;
      authority_type?: string;
      authority_correspondence?: number | null;
      published?: boolean;
      sender_details?: {
        id: number;
      };
      receiver_internal_details?: {
        id: number;
      };
      receiver_external?: string;
      receiver_external_details?: {
        name: string;
      };
    };
  };
  is_internal?: boolean;
}

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
    data,
    is_internal = true,
  }) => {
    const handleDirectionChange = useCallback(
      (id: number, value: string) => {
        setTranscriptDirection(id, value);
      },
      [setTranscriptDirection]
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

        positions.forEach((pos: string) => {
          const numPos = Number(pos);
          if (!transcript.some((t) => t.position === numPos)) {
            const detail = data.transcript?.find((t) => t.position === numPos);
            if (detail) {
              handleAddTranscript();
            }
          }
        });
      }
    }, [data?.transcript]);

    const handleAdd = useCallback(() => {
      if (is_internal) {
        if (selectedTranscript.length > 0) {
          handleAddTranscript();
          setSelectedTranscript([]);
        }
      } else {
        if (externalTranscriptText.trim() !== "") {
          handleAddTranscript(externalTranscriptText.trim());
          setExternalTranscriptText("");
        }
      }
    }, [
      selectedTranscript,
      handleAddTranscript,
      setSelectedTranscript,
      externalTranscriptText,
      is_internal,
    ]);

    const hasReferenceData =
      data?.sender?.reference_details &&
      data.sender.reference_details.length > 0;

    const displayTranscript: ITranscriptResponseType[] = [...transcript];

    if (data?.transcript && data.transcript.length > 0) {
      data.transcript.forEach((detail: ITranscriptResponseType) => {
        if (
          detail.position &&
          !displayTranscript.some((t) => t.position === detail.position)
        ) {
          displayTranscript.push(detail);
        }
      });
    }

    if (!is_internal && externalTranscriptText.trim() !== "") {
      displayTranscript.push({
        id: -1,
        position: -1,
        name: externalTranscriptText.trim(),
      } as ITranscriptResponseType);
    }

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
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={10}>
            <div style={{ display: "flex", gap: 10 }}>
              <MultiSelect
                label="انتخاب گیرندگان رونوشت"
                selectedValues={selectedTranscript.map(String)}
                onChange={(value) => {
                  const filteredValues = value.filter((v) => v !== "");
                  setSelectedTranscript(filteredValues);
                }}
                options={internalUserOptions}
              />

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
            </div>
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

        {displayTranscript.length > 0 && (
          <Box sx={{ mt: 1, mb: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ display: "flex", alignItems: "center", gap: 1 }}
            >
              <Chip
                label={displayTranscript.length}
                size="small"
                color="primary"
                sx={{ fontWeight: "bold", height: 22, minWidth: 22 }}
              />
              گیرنده رونوشت انتخاب شده است
            </Typography>
          </Box>
        )}

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
                (item: ReferenceDetailType, index: number) => (
                  <React.Fragment key={`ref-${item.id}`}>
                    <ListItem sx={{ px: 1, py: 1.5 }}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} md={8}>
                          <Typography
                            sx={{ fontSize: "0.9rem", color: "#1e293b" }}
                          >
                            {item.user?.first_name} {item.user?.last_name} |{" "}
                            {item.position || item.name || "بدون پوزیشن"} |{" "}
                            {item.company_detail?.name ||
                              item.company_name ||
                              "-"}
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

        {displayTranscript.length > 0 ? (
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
              {displayTranscript.map((item, index) => (
                <React.Fragment key={item.position || item.id}>
                  <TranscriptListItem
                    item={item}
                    getTranscriptName={getTranscriptName}
                    transcriptDirections={transcriptDirections}
                    handleDirectionChange={handleDirectionChange}
                    handleTranscriptToggle={handleTranscriptToggle}
                    internalOptions={internalOptions}
                  />
                  {index < displayTranscript.length - 1 && (
                    <Divider sx={{ my: 0.5 }} />
                  )}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        ) : (
          !hasReferenceData && (
            <Box sx={{ p: 2, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                هیچ گیرنده رونوشتی انتخاب نشده است. از لیست بالا گیرندگان را
                انتخاب و اضافه کنید.
              </Typography>
            </Box>
          )
        )}
      </Box>
    );
  }
);

export default Transcript;
