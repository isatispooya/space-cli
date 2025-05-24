import { Grid, Divider, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { TextAreaInput } from "../../../components/common/inputs";
import { AttachmentDialog } from "../components/sent";
import Transcript from "../components/sent/sent_transcript";
import FormSwitches from "../components/sent/switch";
import SenderSection from "../components/sent/SenderSection";
import PrioritySection from "../components/sent/PrioritySection";
import AttachmentSection from "../components/sent/AttachmentSection";
import FormContainer from "../components/sent/FormContainer";
import FormHeader from "../components/sent/FormHeader";
import FormActions from "../components/sent/FormActions";
import PublishedMessage from "../components/sent/PublishedMessage";

import { useSentFormLogic } from "../hooks/sent/useSentFormLogic";
import { useFormStateHandler } from "../hooks/sent/useFormStateHandler";

const MakeForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;
  const [isPublished, setIsPublished] = useState(false);

  const {
    formData,
    openFileDialog,
    selectedTranscript,
    transcriptDirections,
    handleAttachmentAdd,
    handleAddTranscript,
    handleTranscriptToggle,
    setOpenFileDialog,
    setSelectedTranscript,
    setTranscriptDirection,
    handleSubmit: onSubmit,
    senderUserOptions,
    internalUserOptions,
    attachmentOptions,
    getTranscriptName,
    transcriptItems,
    priorityOptions,
    departmentOptions,
    letterTypeOptions,
    senderUserOptionsOut,
  } = useSentFormLogic(id);

  const { handleInputChange } = useFormStateHandler();

  useEffect(() => {
    setIsPublished(formData.published || false);
  }, [formData.published]);

  const handlePublishedChange = (name: string, value: boolean) => {
    if (name === "published") {
      if (value === true) {
        if (
          window.confirm(
            "آیا از انتشار پیام اطمینان دارید؟ بعد از انتشار امکان ویرایش وجود ندارد."
          )
        ) {
          handleInputChange(name, value);
          setTimeout(() => onSubmit(), 100);
        }
      } else if (value === false && formData.published === true) {
        if (window.confirm("آیا از لغو انتشار پیام اطمینان دارید؟")) {
          handleInputChange(name, value);
        }
      }
    } else {
      handleInputChange(name, value);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  const showPublishWarning = formData.published && isEditMode;

  if (isPublished && isEditMode) {
    return (
      <PublishedMessage onNavigateBack={() => navigate("/messenger/sent")} />
    );
  }

  return (
    <FormContainer>
      <FormHeader
        isEditMode={isEditMode}
        showPublishWarning={showPublishWarning}
      />

      <form onSubmit={handleFormSubmit}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12}>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12} md={6}>
                <SenderSection
                   isEditMode={isEditMode}
                  formData={formData}
                  handleChange={handleInputChange}
                  senderUserOptions={senderUserOptions}
                  senderUserOptionsOut={senderUserOptionsOut}
                  internalUserOptions={internalUserOptions}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={{ xs: 2, sm: 2 }}>
                  <Grid item xs={12} sm={7}>
                    <PrioritySection
                      formData={formData}
                      handleChange={handleInputChange}
                      priorityOptions={priorityOptions}
                      departmentOptions={departmentOptions}
                      letterTypeOptions={letterTypeOptions}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <AttachmentSection
                      setOpenFileDialog={setOpenFileDialog}
                      formData={formData}
                      handleChange={handleInputChange}
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
              onChange={(e) => handleInputChange("text", e.target.value)}
              rows={isMobile ? 6 : 8}
              className="enhanced-textarea"
              containerClassName="full-width"
            />
          </Grid>

          <Grid item xs={12}>
            <TextAreaInput
              label="پی نوشت"
              value={formData.postcript || ""}
              onChange={(e) => handleInputChange("postcript", e.target.value)}
              rows={isMobile ? 1 : 2}
              className="enhanced-textarea"
            />
          </Grid>

          <Grid item xs={12}>
            <TextAreaInput
              label="توضیحات"
              value={formData.description || ""}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={2}
              className="enhanced-textarea"
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <FormSwitches
              formData={formData}
              handleChange={handlePublishedChange}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <Transcript
              data={
                { sender: { sender_details: { id: 0 } } } as {
                  sender: { sender_details: { id: number } };
                }
              }
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
            <FormActions
              isEditMode={isEditMode}
              showPublishWarning={showPublishWarning}
              formData={formData}
              onSubmit={onSubmit}
            />
          </Grid>
        </Grid>
      </form>

      <AttachmentDialog
        open={openFileDialog}
        onClose={() => setOpenFileDialog(false)}
        onAttachmentAdd={handleAttachmentAdd}
      />
    </FormContainer>
  );
};

export default MakeForm;
