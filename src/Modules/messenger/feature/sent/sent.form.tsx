import { Box, Typography, Paper, Grid, useTheme, useMediaQuery } from "@mui/material";

import { ButtonBase } from "../../../../components/common/buttons";
import { usePosition } from "@/Modules/positions/hooks";
import { PositionTypes } from "@/Modules/positions/types";
import React, { useState } from "react";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import {
  CorrespondenceAttachment,
  CorrespondenceAttachments,
  APIFormDataType,
  TranscriptAPIData,
} from "../../types/sent/CorrespondenceAttache.type";
import {
  AttachmentDialog,
  SenderReceiverSection,
  MessageOptionsSection,
  MessageContentSection,
  AdditionalInfoSection,
  FormSwitchesSection,
  TranscriptSection
} from "../../components/sent";
import { useSentFormStore } from "../../store/sent/sent.store";
import {
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
  referralOptions,
  referralDetailsOptions,
} from "../../data/sent/sent.data";
import { STYLES } from "../../style";
import "./sent.css";

const SentForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const {
    formData,
    openFileDialog,
    selectedTranscript,
    transcriptDirections,
    handleChange,
    handleAttachmentAdd,
    handleAddTranscript,
    handleTranscriptToggle,
    setOpenFileDialog,
    setSelectedTranscript,
    setTranscriptDirection,
  } = useSentFormStore();

  const [useInternalReceiver, setUseInternalReceiver] = useState(true);

  const { data: Position } = usePosition.useGet();
  const { data: PositionAll } = usePosition.useGetAll();

  const { data: Attache } =
    useCorrespondenceAttachment.useGetAttache() as unknown as {
      data: CorrespondenceAttachments;
    };
  const { mutate: postCorrespondence } =
    useCorrespondenceAttachment.usePostCorrespondence();

  const attachmentOptions =
    Attache?.map((attachment: CorrespondenceAttachment) => ({
      label: `${attachment.name} | ${attachment.user.first_name} ${attachment.user.last_name}`,
      value: attachment.id.toString(),
    })) || [];

  const internalUserOptions =
    (Position as PositionTypes[])?.map((position) => ({
      label: `${position.user.first_name} ${position.user.last_name} | ${position.user.uniqueIdentifier}`,
      value: position.id.toString(),
    })) || [];

  const senderUserOptions =
    (PositionAll as PositionTypes[])?.map((PositionAll) => ({
      label: `${PositionAll.user.first_name} ${PositionAll.user.last_name} | ${PositionAll.user.uniqueIdentifier}`,
      value: PositionAll.id.toString(),
    })) || [];

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    console.log(senderUserOptions);

    const { transcript, ...restFormData } = formData;

    const apiTranscript: TranscriptAPIData = {
      position: formData.sender || transcript[0]?.position,
      transcript_for: transcript[0]?.transcript_for,
      security: transcript[0]?.security,
      correspondence: null,
      read_at: new Date().toISOString(),
    };

    const finalData: APIFormDataType = {
      ...restFormData,
      attachments: restFormData.attachments.map(Number),
      receiver_internal: Number(restFormData.receiver_internal),
      transcript: [apiTranscript],
    };
    postCorrespondence(finalData);
  };

  const getTranscriptName = (id: string): string => {
    const recipient = internalUserOptions.find((option) => option.value === id);
    return recipient ? recipient.label : "";
  };

  const transcriptItems = React.useMemo(() => {
    return formData.referenceData?.map((refData) => ({
      id: refData.id.toString(),
      enabled: refData.enabled,
      transcript_for: transcriptDirections[refData.id.toString()] || refData.transcript_for || "notification",
    })) || [];
  }, [formData.referenceData, transcriptDirections]);

  return (
    <Box sx={{
      ...STYLES.container,
      width: "100%",
      px: { xs: 1, sm: 2, md: 3 },
    }} className="sent-form-container">
      <Paper elevation={3} sx={{ 
        ...STYLES.paper, 
        p: { xs: 2, sm: 3 },
        overflow: "hidden",
      }}>
        <Typography
          variant="h5"
          sx={{
            ...STYLES.title,
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            mb: { xs: 2, sm: 3 },
          }}
        >
          ارسال پیام جدید
        </Typography>

        <form onSubmit={handleSubmit}>  
          <Grid container spacing={{ xs: 2, sm: 3 }}>
            <Grid item xs={12} md={6}>
              <SenderReceiverSection 
                formData={formData}
                handleChange={handleChange}
                useInternalReceiver={useInternalReceiver}
                setUseInternalReceiver={setUseInternalReceiver}
                positionOptions={senderUserOptions}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <MessageOptionsSection 
                  formData={formData}
                  handleChange={handleChange}
                  setOpenFileDialog={setOpenFileDialog}
                  priorityOptions={priorityOptions}
                  departmentOptions={departmentOptions}
                  letterTypeOptions={letterTypeOptions}
                  attachmentOptions={attachmentOptions}
                />
              </Grid>
            </Grid>
            
            <MessageContentSection 
              formData={formData}
              handleChange={handleChange}
              isMobile={isMobile}
            />
            
            <AdditionalInfoSection 
              formData={formData}
              handleChange={handleChange}
              referralOptions={referralOptions}
              referralDetailsOptions={referralDetailsOptions}
            />
          </Grid>

          <FormSwitchesSection 
            formData={formData}
            handleChange={handleChange}
          />

          <TranscriptSection 
            transcriptItems={transcriptItems}
            selectedTranscript={selectedTranscript}
            transcriptDirections={transcriptDirections}
            internalUserOptions={internalUserOptions}
            getTranscriptName={getTranscriptName}
            setSelectedTranscript={setSelectedTranscript}
            handleAddTranscript={handleAddTranscript}
            handleTranscriptToggle={handleTranscriptToggle}
            setTranscriptDirection={setTranscriptDirection}
          />

          <Grid item xs={12}>
            <Box sx={{ 
              display: "flex", 
              justifyContent: "center",
              mt: { xs: 1.5, sm: 2 }
            }}>
              <ButtonBase
                label="ارسال پیام"
                onClick={handleSubmit}
                bgColor="#1976d2"
                hoverColor="#1565c0"
              />
            </Box>
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

export default SentForm;
