import { Box, Typography, Paper } from "@mui/material";
import {
  FormInput,
  MultiSelect,
  SelectInput,
  TextAreaInput,
} from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import { useState } from "react";
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
type FormDataType = {
  receiverType: string;
  receiver: string;
  subject: string;
  priority: string;
  department: string;
  content: string;
  attachments: string[];
  ccRecipients: { id: string; enabled: boolean }[];
  transcript: { id: string; enabled: boolean }[];
};
const SentForm = () => {
  const [formData, setFormData] = useState<FormDataType>({
    receiverType: "internal",
    receiver: "",
    subject: "",
    priority: "",
    department: "",
    content: "",
    attachments: [],
    ccRecipients: [],
    transcript: [],
  });
  const [openFileDialog, setOpenFileDialog] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<string[]>([]);

  const { data: Position } = usePosition.useGet();
  const { data: Attache } =
    useCorrespondenceAttachment.useGetAttache() as unknown as {
      data: CorrespondenceAttachments;
    };

  const attachmentOptions = [
    { label: "➕ اضافه کردن پیوست", value: "add_attachment" },
    ...(Attache
      ? Attache.map((attachment: CorrespondenceAttachment) => ({
          label: `${attachment.name} | ${attachment.user.first_name} ${attachment.user.last_name}`,
          value: attachment.file,
        }))
      : []),
  ];

  console.log(Attache);

  const internalUserOptions =
    (Position as PositionTypes[])?.map((position) => ({
      label: `${position.user.first_name} ${position.user.last_name} | ${position.user.uniqueIdentifier}`,
      value: position.user.uniqueIdentifier,
    })) || [];

  const handleChange = (name: string, value: string | string[]) => {
    if (name === "attachments") {
      if (Array.isArray(value) && value.includes("add_attachment")) {
        setOpenFileDialog(true);
        const filteredValue = value.filter((v) => v !== "add_attachment");
        setFormData((prev) => ({
          ...prev,
          attachments: filteredValue,
        }));
        return;
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReceiverTypeChange = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      receiverType: type,
      receiver: "",
    }));
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    console.log(formData);
  };

  const handleAttachmentAdd = (attachmentData: {
    name: string;
    file: string;
  }) => {
    setFormData((prev) => ({
      ...prev,
      attachments: [...prev.attachments, attachmentData.file],
    }));
  };

  const priorityOptions = [
    { label: "فوری", value: "urgent" },
    { label: "عادی", value: "normal" },
  ];

  const departmentOptions = [
    { label: "منابع انسانی", value: "hr" },
    { label: "مالی", value: "finance" },
    { label: "فنی", value: "technical" },
  ];

  const handleAddTranscript = () => {
    if (selectedTranscript.length > 0) {
      const newTranscripts = selectedTranscript
        .filter((id) => !formData.transcript.some((t) => t.id === id))
        .map((id) => ({ id, enabled: false }));

      if (newTranscripts.length > 0) {
        setFormData((prev) => ({
          ...prev,
          transcript: [...prev.transcript, ...newTranscripts],
        }));
      }
    }
  };

  const handleTranscriptToggle = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      transcript: prev.transcript.map((transcript) =>
        transcript.id === id
          ? { ...transcript, enabled: !transcript.enabled }
          : transcript
      ),
    }));
  };

  const getTranscriptName = (id: string) => {
    const recipient = internalUserOptions.find((option) => option.value === id);
    return recipient ? recipient.label : "";
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
          ارسال پیام جدید
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3, display: "flex", justifyContent: "center" }}>
            <ButtonBase
              label="گیرنده داخلی"
              onClick={() => handleReceiverTypeChange("internal")}
              bgColor={
                formData.receiverType === "internal" ? "#1976d2" : "#94a3b8"
              }
              hoverColor={
                formData.receiverType === "internal" ? "#1565c0" : "#64748b"
              }
            />
            <ButtonBase
              label="گیرنده خارجی"
              onClick={() => handleReceiverTypeChange("external")}
              bgColor={
                formData.receiverType === "external" ? "#1976d2" : "#94a3b8"
              }
              hoverColor={
                formData.receiverType === "external" ? "#1565c0" : "#64748b"
              }
            />
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            {formData.receiverType === "internal" ? (
              <SelectInput
                label="گیرنده داخلی"
                value={formData.receiver}
                onChange={(value) => handleChange("receiver", value)}
                options={internalUserOptions}
              />
            ) : (
              <FormInput
                label="گیرنده خارجی"
                value={formData.receiver}
                onChange={(e) => handleChange("receiver", e.target.value)}
                placeholder="گیرنده خارجی"
              />
            )}
            <FormInput
              label="موضوع"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
            <MultiSelect
              label="پیوست‌ها"
              selectedValues={formData.attachments}
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
              value={formData.department}
              onChange={(value) => handleChange("department", value)}
              options={departmentOptions}
            />
          </Box>
          <TextAreaInput
            label="متن پیام"
            value={formData.content}
            onChange={(e) => handleChange("content", e.target.value)}
            style={{ marginBottom: "1.5rem" }}
            rows={4}
          />

          <Transcript
            transcript={formData.transcript}
            selectedTranscript={selectedTranscript}
            setSelectedTranscript={setSelectedTranscript}
            handleAddTranscript={handleAddTranscript}
            handleTranscriptToggle={handleTranscriptToggle}
            internalUserOptions={internalUserOptions}
            getTranscriptName={getTranscriptName}
            handleChange={handleChange}
          />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
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
