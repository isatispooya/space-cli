import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import React from "react";
import { useParams } from "react-router-dom";

import { TextAreaInput } from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import { AttachmentDialog } from "../../components/sent";
import Transcript from "../../components/sent/sent_transcript";
import FormSwitches from "../../components/sent/switch";
import ReceiverTypeButtons from "../../components/sent/ReceiverTypeButtons";
import SenderSection from "../../components/sent/SenderSection";
import PrioritySection from "../../components/sent/PrioritySection";
import AttachmentSection from "../../components/sent/AttachmentSection";

import { useSentFormLogic } from "../../hooks/sent/useSentFormLogic";
import { STYLES } from "../../style";

const SentUpdateForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const isEditMode = !!id;

  const {
    formData,
    openFileDialog,
    selectedTranscript,
    transcriptDirections,
    useInternalReceiver,
    handleChange,
    handleAttachmentAdd,
    handleAddTranscript,
    handleTranscriptToggle,
    setOpenFileDialog,
    setSelectedTranscript,
    setTranscriptDirection,
    handleSubmit,
    handleReceiverTypeChange,
    senderUserOptions,
    internalUserOptions,
    attachmentOptions,
    getTranscriptName,
    transcriptItems,
    data,
    priorityOptions,
    departmentOptions,
    letterTypeOptions,
  } = useSentFormLogic(id);

  return (
    <Box
      sx={{
        ...STYLES.container,
        width: "100%",
        px: { xs: 1, sm: 2, md: 3 },
      }}
      className="sent-form-container"
    >
      <Paper
        elevation={3}
        sx={{
          ...STYLES.paper,
          p: { xs: 2, sm: 3 },
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            ...STYLES.title,
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            mb: { xs: 2, sm: 3 },
          }}
        >
          {isEditMode ? "ویرایش پیام" : "ثبت پیام جدید"}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12}>
              <ReceiverTypeButtons
                receiverType={useInternalReceiver ? "internal" : "external"}
                onTypeChange={handleReceiverTypeChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid item xs={12} md={6}>
                  <SenderSection
                    formData={formData}
                    handleChange={handleChange}
                    senderUserOptions={senderUserOptions}
                    useInternalReceiver={useInternalReceiver}
                    internalUserOptions={internalUserOptions}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Grid container spacing={{ xs: 2, sm: 2 }}>
                    <Grid item xs={12} sm={7}>
                      <PrioritySection
                        formData={formData}
                        handleChange={handleChange}
                        priorityOptions={priorityOptions}
                        departmentOptions={departmentOptions}
                        letterTypeOptions={letterTypeOptions}
                      />
                    </Grid>
                    <Grid item xs={12} sm={5}>
                      <AttachmentSection
                        setOpenFileDialog={setOpenFileDialog}
                        formData={formData}
                        handleChange={handleChange}
                        attachmentOptions={attachmentOptions}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <TextAreaInput
                label="متن پیام"
                value={formData.text || ""}
                onChange={(e) => handleChange("text", e.target.value)}
                rows={isMobile ? 6 : 8}
                className="enhanced-textarea"
                containerClassName="full-width"
              />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ width: "100%" }}>
                <TextAreaInput
                  label="پی نوشت"
                  value={formData.postcript || ""}
                  onChange={(e) => handleChange("postcript", e.target.value)}
                  rows={isMobile ? 1 : 2}
                  className="enhanced-textarea"
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextAreaInput
                label="توضیحات"
                value={formData.description || ""}
                onChange={(e) => handleChange("description", e.target.value)}
                rows={2}
                className="enhanced-textarea"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
              <FormSwitches formData={formData} handleChange={handleChange} />
            </Grid>

            <Grid item xs={12}>
              <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
              <Typography
                variant="subtitle1"
                sx={{
                  mb: { xs: 1, sm: 2 },
                  fontWeight: "medium",
                  color: "#555",
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                رونوشت گیرندگان
              </Typography>
              <Transcript
                data={data}
                transcript={transcriptItems}
                selectedTranscript={selectedTranscript}
                setSelectedTranscript={setSelectedTranscript}
                handleAddTranscript={handleAddTranscript}
                handleTranscriptToggle={handleTranscriptToggle}
                internalUserOptions={internalUserOptions}
                getTranscriptName={getTranscriptName}
                transcriptDirections={transcriptDirections}
                setTranscriptDirection={setTranscriptDirection}
              />
            </Grid>

            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: { xs: 1.5, sm: 2 },
                  mb: { xs: 5.5, sm: 5 },
                }}
              >
                <ButtonBase
                  label={isEditMode ? "ویرایش پیام" : "ثبت پیام"}
                  onClick={handleSubmit}
                  bgColor="#1976d2"
                  hoverColor="#1565c0"
                />
              </Box>
            </Grid>
          </Grid>
        </form>

        <AttachmentDialog
          open={openFileDialog}
          onClose={() => setOpenFileDialog(false)}
          onAttachmentAdd={handleAttachmentAdd}
        />
      </Paper>
    </Box>
  );
};

export default SentUpdateForm;
