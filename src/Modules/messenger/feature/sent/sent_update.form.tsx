import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";

import {
  FormInput,
  MultiSelect,
  SelectInput,
  TextAreaInput,
} from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import { usePosition } from "@/Modules/positions/hooks";
import { PositionTypes } from "@/Modules/positions/types";
import React, { useState, useEffect } from "react";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import {
  CorrespondenceAttachment,
  CorrespondenceAttachments,
  APIFormDataType,
} from "../../types/sent/sent.type";
import { AttachmentDialog } from "../../components/sent";
import Transcript from "../../components/sent/sent_transcript";
import { useSentFormStore } from "../../store/sent/sent.store";
import {
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
} from "../../data/sent/sent.data";
import { useParams } from "react-router-dom";
import { STYLES } from "../../style";
import FormSwitches from "../../components/sent/switch";
import ReceiverTypeButtons from "../../components/sent/ReceiverTypeButtons";
import { useReceiveById } from "../../hooks/receive/useReceive";

const SentUpdateForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    setFormData,
  } = useSentFormStore();

  const [useInternalReceiver, setUseInternalReceiver] = useState(
    formData.is_internal ?? true
  );

  const { id } = useParams();
  const isEditMode = !!id;

  const { data: Position } = usePosition.useGet();
  const { data: PositionAll } = usePosition.useGetAll();
  const { data: Attache } =
    useCorrespondenceAttachment.useGetAttache() as unknown as {
      data: CorrespondenceAttachments;
    };

  const { data } = useReceiveById(id || "");

  useEffect(() => {
    if (id && data?.sender) {
      setFormData({
        ...data.sender,
        sender: data.sender.sender_details?.id.toString(),
        receiver_internal: data.sender.receiver_internal_details?.id.toString(),
        receiver_external:
          data.sender.receiver_external_details?.name ||
          data.sender.receiver_external,
      });
      setUseInternalReceiver(data.sender.is_internal);
    } else if (!isEditMode) {
      setFormData({
        subject: "",
        text: "",
        description: "",
        attachments: [],
        receiver: [],
        sender: undefined as unknown as number,
        receiver_internal: undefined as unknown as number,
        receiver_external: "",
        is_internal: true,
        postcript: "",
        seal: false,
        signature: false,
        letterhead: false,
        binding: false,
        confidentiality_level: "",
        priority: "",
        kind_of_correspondence: "",
        authority_type: "new",
        authority_correspondence: null,
        reference: [],
        transcript: [],
        published: false,
      });
      setUseInternalReceiver(true);
    }
  }, [setFormData, data, id, isEditMode]);

  useEffect(() => {
    setUseInternalReceiver(formData.is_internal ?? true);
  }, [formData.is_internal]);

  const { mutate: updateCorrespondence } =
    useCorrespondenceAttachment.useUpdateCorrespondence();
  const { mutate: postCorrespondence } =
    useCorrespondenceAttachment.usePostCorrespondence();

  const attachmentOptions =
    Attache?.map((attachment: CorrespondenceAttachment) => ({
      label: `${attachment.name} | ${attachment.user.first_name} ${attachment.user.last_name}`,
      value: attachment.id.toString(),
    })) || [];

  const internalUserOptions =
    (PositionAll as PositionTypes[])?.map((position) => ({
      label: `${position.user.first_name} ${position.user.last_name} | ${position.user.uniqueIdentifier}`,
      value: position.id.toString(),
    })) || [];

  const senderUserOptions =
    (Position as PositionTypes[])?.map((position) => ({
      label: `${position.user.first_name} ${position.user.last_name} | ${position.user.uniqueIdentifier}`,
      value: position.id.toString(),
    })) || [];

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }

    const {...restFormData } = formData;

    const apiTranscripts = formData.reference?.map(ref => ({
      position: Number(ref),
      transcript_for: transcriptDirections[ref.toString()] || "notification",
      security: false,
      correspondence: null,
      read_at: new Date().toISOString(),
    })) || [];

    if (formData.sender && !apiTranscripts.find(t => t.position === formData.sender)) {
      apiTranscripts.unshift({
        position: formData.sender,
        transcript_for: "notification",
        security: false,
        correspondence: null,
        read_at: new Date().toISOString(),
      });
    }

    const finalData: APIFormDataType = {
      ...restFormData,
      attachments: restFormData.attachments.map(Number),
      receiver_internal: Number(restFormData.receiver_internal) || null,
      transcript: apiTranscripts,
    };

    if (isEditMode && id) {
      updateCorrespondence({ ...finalData, id: Number(id) });
    } else {
      postCorrespondence(finalData);
    }
  };

  const getTranscriptName = (id: string): string => {
    const recipient = internalUserOptions.find((option) => option.value === id);
    return recipient ? recipient.label : "";
  };

  const transcriptItems =
    formData.reference?.map((ref) => ({
      id: ref.toString(),
      enabled: true,
      transcript_for: transcriptDirections[ref.toString()],
    })) || [];

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
                onTypeChange={(type) => {
                  setUseInternalReceiver(type === "internal");
                  handleChange("is_internal", type === "internal");
                  // Reset receiver values when switching types
                  if (type === "internal") {
                    handleChange("receiver_external", "");
                  } else {
                    handleChange("receiver_internal", "");
                  }
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={{ xs: 2, sm: 3 }}>
                <Grid item xs={12} md={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={{ xs: 1, sm: 2 }}
                  >
                    <SelectInput
                      label="ارسال کننده"
                      value={formData.sender?.toString() || ""}
                      onChange={(value) => handleChange("sender", value)}
                      options={senderUserOptions}
                      className="enhanced-select"
                    />

                    {useInternalReceiver ? (
                      <SelectInput
                        label="گیرنده داخلی"
                        value={formData.receiver_internal?.toString() || ""}
                        onChange={(value) =>
                          handleChange("receiver_internal", value)
                        }
                        options={internalUserOptions}
                        className="enhanced-select"
                      />
                    ) : (
                      <FormInput
                        label="گیرنده خارجی"
                        value={formData.receiver_external || ""}
                        onChange={(e) =>
                          handleChange("receiver_external", e.target.value)
                        }
                        placeholder="گیرنده خارجی"
                        className="enhanced-input"
                      />
                    )}

                    <FormInput
                      label="موضوع"
                      value={formData.subject || ""}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      className="enhanced-input"
                    />
                  </Box>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Grid container spacing={{ xs: 2, sm: 2 }}>
                    <Grid item xs={12} sm={7}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={{ xs: 1, sm: 2 }}
                      >
                        <SelectInput
                          label="اولویت"
                          value={formData.priority || ""}
                          onChange={(value) => handleChange("priority", value)}
                          options={priorityOptions}
                          className="enhanced-select"
                        />
                        <SelectInput
                          label="محرمانگی"
                          value={formData.confidentiality_level || ""}
                          onChange={(value) =>
                            handleChange("confidentiality_level", value)
                          }
                          options={departmentOptions}
                          className="enhanced-select"
                        />
                        <SelectInput
                          label="نوع نامه"
                          value={formData.kind_of_correspondence || ""}
                          onChange={(value) =>
                            handleChange("kind_of_correspondence", value)
                          }
                          options={letterTypeOptions}
                          className="enhanced-select"
                        />
                      </Box>
                    </Grid>

                    <Grid item xs={12} sm={5}>
                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={{ xs: 1, sm: 2 }}
                      >
                        <Box
                          sx={{
                            mt: { xs: 1, sm: 2 },
                            width: "100%",
                            height: { xs: "100px", sm: "130px" },
                            border: "2px dashed #ccc",
                            borderRadius: "12px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            padding: 1,
                            bgcolor: "#f9f9f9",
                            transition: "all 0.3s",
                            "&:hover": {
                              backgroundColor: "#e0f7fa",
                              borderColor: "#1976d2",
                            },
                          }}
                          onClick={() => setOpenFileDialog(true)}
                        >
                          <Typography variant="h4" color="primary">
                            +
                          </Typography>
                          <Typography variant="body2">افزودن پیوست</Typography>
                        </Box>

                        <MultiSelect
                          label="پیوست‌ها"
                          selectedValues={
                            formData.attachments?.map(String) || []
                          }
                          onChange={(value) =>
                            handleChange("attachments", value)
                          }
                          options={attachmentOptions}
                          className="enhanced-select"
                        />
                      </Box>
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
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                }}
              >
                <Box sx={{ width: "100%" }}>
                  <TextAreaInput
                    label={"پی نوشت"}
                    value={formData.postcript || ""}
                    onChange={(e) => handleChange("postcript", e.target.value)}
                    rows={isMobile ? 1 : 2}
                    className="enhanced-textarea"
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Grid container spacing={{ xs: 2, sm: 2 }}>
                <Grid item xs={12} md={12}>
                  <TextAreaInput
                    label={"توضیحات"}
                    value={formData.description || ""}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    rows={2}
                    className="enhanced-textarea"
                  />
                </Grid>
                {/* <Grid item xs={12} md={4}>
                  <SelectInput
                    label="نوع ارجاع"
                    value={formData.authority_type || ""}
                    onChange={(value) => handleChange("authority_type", value)}
                    options={referralOptions}
                    className="enhanced-select"
                  />
                </Grid> */}
                {/* {formData.authority_type && (
                  <Grid item xs={12} md={4}>
                    <SelectInput
                      label="ارجاع"
                      value={
                        formData.authority_correspondence?.toString() || ""
                      }
                      onChange={(value) =>
                        handleChange("authority_correspondence", value)
                      }
                      options={referralDetailsOptions}
                      className="enhanced-select"
                    />
                  </Grid>
                )} */}
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              <Grid item xs={12}>
                <Box sx={{ mt: 1 }}>
                  <FormSwitches
                    formData={formData}
                    handleChange={handleChange}
                  />
                </Box>
              </Grid>
            </Grid>
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
