import { Box, Typography, Paper } from "@mui/material";
import {
  FormInput,
  MultiSelect,
  SelectInput,
  TextAreaInput,
} from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import { usePosition } from "@/Modules/positions/hooks";
import { PositionTypes } from "@/Modules/positions/types";
import React from "react";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import {
  CorrespondenceAttachment,
  CorrespondenceAttachments,
} from "../../types/sent/CorrespondenceAttache.type";
import { AttachmentDialog } from "../../components/sent";
import Transcript from "../../components/sent/sent_transcript";
import { useSentFormStore } from "../../store/sent/sent.store";
import {
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
  referralOptions,
  referralDetailsOptions,
} from "../../data/sent/sent.data";
import ReceiverTypeButtons from "../../components/sent/ReceiverTypeButtons";
import { TEXT_AREA_FIELDS } from "../../data/sent/sent_inputs";
import { STYLES } from "../../style";
import FormSwitches from "../../components/sent/switch";

const SentForm: React.FC = () => {
  const {
    formData,
    openFileDialog,
    selectedTranscript,
    handleChange,
    handleReceiverTypeChange,
    handleAttachmentAdd,
    handleAddTranscript,
    handleTranscriptToggle,
    setOpenFileDialog,
    setSelectedTranscript,
  } = useSentFormStore();

  const { data: Position } = usePosition.useGet();
  const { data: Attache } =
    useCorrespondenceAttachment.useGetAttache() as unknown as {
      data: CorrespondenceAttachments;
    };
  const { mutate: postCorrespondence, data: Correspondence } =
    useCorrespondenceAttachment.usePostCorrespondence();

  console.log(Correspondence);

  const attachmentOptions = [
    { label: "➕ اضافه کردن پیوست", value: "add_attachment" },
    ...(Attache?.map((attachment: CorrespondenceAttachment) => ({
      label: `${attachment.name} | ${attachment.user.first_name} ${attachment.user.last_name}`,
      value: attachment.id.toString(),
    })) || []),
  ];

  const internalUserOptions =
    (Position as PositionTypes[])?.map((position) => ({
      label: `${position.user.first_name} ${position.user.last_name} | ${position.user.uniqueIdentifier}`,
      value: position.id.toString(),
    })) || [];

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    postCorrespondence(formData);
  };

  const getTranscriptName = (id: string): string => {
    const recipient = internalUserOptions.find((option) => option.value === id);
    return recipient ? recipient.label : "";
  };

  const externalUserOptions = [
    { label: "گیرنده خارجی", value: "external" },
    { label: "گیرنده داخلی", value: "internal" },
  ];

  return (
    <Box sx={STYLES.container}>
      <Paper elevation={3} sx={STYLES.paper}>
        <Typography variant="h5" sx={STYLES.title}>
          ارسال پیام جدید
        </Typography>
        <form onSubmit={handleSubmit}>
          <ReceiverTypeButtons
            receiverType={formData.receiver_external}
            onTypeChange={handleReceiverTypeChange}
          />

          <Box sx={STYLES.gridContainer}>
            <SelectInput
              label="ارسال کننده"
              value={formData.sender_id.toString()}
              onChange={(value) => handleChange("sender_id", value)}
              options={externalUserOptions}
            />
            {formData.receiver_external === "internal" ? (
              <SelectInput
                label="گیرنده داخلی"
                value={formData.receiver_internal.toString()}
                onChange={(value) => handleChange("receiver_internal", value)}
                options={internalUserOptions}
              />
            ) : (
              <FormInput
                label="گیرنده خارجی"
                value={formData.receiver_external}
                onChange={(e) =>
                  handleChange("receiver_external", e.target.value)
                }
                placeholder="گیرنده خارجی"
              />
            )}

            <FormInput
              label="موضوع"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
            <SelectInput
              label="نوع ارجاع"
              value={formData.authority_type}
              onChange={(value) => handleChange("authority_type", value)}
              options={referralOptions}
            />
            {formData.authority_type && (
              <SelectInput
                label="ارجاع"
                value={formData.authority_correspondence.toString()}
                onChange={(value) =>
                  handleChange("authority_correspondence", value)
                }
                options={referralDetailsOptions}
              />
            )}
            <SelectInput
              label="نوع نامه"
              value={formData.kind_of_correspondence}
              onChange={(value) =>
                handleChange("kind_of_correspondence", value)
              }
              options={letterTypeOptions}
            />
            <MultiSelect
              label="پیوست‌ها"
              selectedValues={formData.attachments.map(String)}
              onChange={(value) => handleChange("attachments", value)}
              options={attachmentOptions}
            />
            <SelectInput
              label="اولویت"
              value={formData.priority}
              onChange={(value) => handleChange("priority", value)}
              options={priorityOptions}
            />
            <SelectInput
              label="محرمانگی"
              value={formData.confidentiality_level}
              onChange={(value) => handleChange("confidentiality_level", value)}
              options={departmentOptions}
            />
          </Box>

          <Box sx={STYLES.gridContainer}>
            {TEXT_AREA_FIELDS.map(({ field, label }) => (
              <TextAreaInput
                key={field}
                label={label}
                value={formData[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                style={{ marginBottom: "1.5rem" }}
                rows={4}
              />
            ))}
          </Box>

          <FormSwitches formData={formData} handleChange={handleChange} />

          <Transcript
            transcript={formData.reference.map((id) => ({
              id: String(id),
              enabled: true,
            }))}
            selectedTranscript={selectedTranscript}
            setSelectedTranscript={setSelectedTranscript}
            handleAddTranscript={handleAddTranscript}
            handleTranscriptToggle={handleTranscriptToggle}
            internalUserOptions={internalUserOptions}
            getTranscriptName={getTranscriptName}
            handleChange={handleChange}
          />

          <Box sx={STYLES.submitButton}>
            <ButtonBase
              label="ارسال پیام"
              onClick={handleSubmit}
              bgColor="#1976d2"
              hoverColor="#1565c0"
            />
          </Box>
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
