import { Grid, Divider, useTheme, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { TextAreaInput } from "../../../../components/common/inputs";
import { AttachmentDialog } from "../../components/sent";
import Transcript from "../../components/sent/sent_transcript";
import FormSwitches from "../../components/sent/switch";
import ReceiverTypeButtons from "../../components/sent/ReceiverTypeButtons";
import SenderSection from "../../components/sent/SenderSection";
import PrioritySection from "../../components/sent/PrioritySection";
import AttachmentSection from "../../components/sent/AttachmentSection";
import FormContainer from "../../components/sent/FormContainer";
import FormHeader from "../../components/sent/FormHeader";
import FormActions from "../../components/sent/FormActions";
import PublishedMessage from "../../components/sent/PublishedMessage";

import { useSentFormLogic } from "../../hooks/sent/useSentFormLogic";
import { useFormStateHandler } from "../../hooks/sent/useFormStateHandler";
import { AttachmentType } from "../../types/sent/attachment.type";
import { TranscriptItemType } from "../../types/sent/transcript.type";

const SentUpdateForm: React.FC = () => {
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
    useInternalReceiver,
    handleAttachmentAdd,
    handleAddTranscript,
    handleTranscriptToggle,
    setOpenFileDialog,
    setSelectedTranscript,
    setTranscriptDirection,
    handleSubmit: onSubmit,
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

  const handleTranscriptAddAdapter = () => {
    if (selectedTranscript) {
      handleAddTranscript(selectedTranscript);
    }
  };

  const showPublishWarning = formData.published && isEditMode;

  if (isPublished && isEditMode) {
    return (
      <PublishedMessage onNavigateBack={() => navigate("/messenger/sent")} />
    );
  }

  const attachmentSectionFormData = {
    attachments: formData.attachments?.map(id => id.toString()) || [],
    subject: formData.subject,
    text: formData.text,
    description: formData.description
  };

  const formActionData = {
    published: formData.published || false
  };

  return (
    <FormContainer>
      <FormHeader
        isEditMode={isEditMode}
        showPublishWarning={showPublishWarning || false}
      />

      <form onSubmit={handleFormSubmit}>
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
                  formData={{
                    sender: formData.sender?.toString() || "",
                    sender_details: data?.sender_details || {},
                    receiver_internal: formData.receiver_internal?.toString() || "",
                    receiver_internal_details: data?.receiver_internal_details || {},
                    receiver_external: formData.receiver_external || "",
                    subject: formData.subject || ""
                  }}
                  handleChange={(field: string, value: string) => handleInputChange(field, value)}
                  senderUserOptions={senderUserOptions}
                  senderUserOptionsOut={senderUserOptionsOut}
                  useInternalReceiver={useInternalReceiver}
                  internalUserOptions={internalUserOptions}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={{ xs: 2, sm: 2 }}>
                  <Grid item xs={12} sm={7}>
                    <PrioritySection
                      formData={{
                        priority: formData.priority || "",
                        confidentiality_level: formData.confidentiality_level || "",
                        kind_of_correspondence: formData.kind_of_correspondence || ""
                      }}
                      handleChange={(field: string, value: string) => handleInputChange(field, value)}
                      priorityOptions={priorityOptions}
                      departmentOptions={departmentOptions}
                      letterTypeOptions={letterTypeOptions}
                    />
                  </Grid>
                  <Grid item xs={12} sm={5}>
                    <AttachmentSection
                      setOpenFileDialog={setOpenFileDialog}
                      formData={attachmentSectionFormData}
                      attachments={formData.attachments?.map(id => id.toString()) || []}
                      handleChange={(field: string, value: string[]) => 
                        handleInputChange(field, value)
                      }
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
              data={data}
              transcript={transcriptItems as unknown as TranscriptItemType[]}
              selectedTranscript={(selectedTranscript ? [selectedTranscript.toString()] : []) as string[]}
              setSelectedTranscript={(transcripts: string[]) => {
                if (transcripts.length > 0) {
                  setSelectedTranscript(transcripts);
                } else {
                  setSelectedTranscript([]);
                }
              }}
              handleAddTranscript={handleTranscriptAddAdapter}
              handleTranscriptToggle={(id: number) => handleTranscriptToggle(id)}
              internalUserOptions={internalUserOptions}
              getTranscriptName={getTranscriptName}
              transcriptDirections={transcriptDirections}
              setTranscriptDirection={setTranscriptDirection}
              is_internal={formData.is_internal || false}
            />
          </Grid>

          <Grid item xs={12}>
            <FormActions
              isEditMode={isEditMode}
              showPublishWarning={showPublishWarning || false}
              formData={formActionData}
              onSubmit={onSubmit}
            />
          </Grid>
        </Grid>
      </form>

      <AttachmentDialog
        open={openFileDialog}
        onClose={() => setOpenFileDialog(false)}
        onAttachmentAdd={(attachmentData: AttachmentType) => 
          handleAttachmentAdd(attachmentData)
        }
      />
    </FormContainer>
  );
};

export default SentUpdateForm;
