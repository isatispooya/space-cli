import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
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
import React from "react";
import useCorrespondenceAttachment from "../../hooks/sent/useCorrespondenceAttachment";
import {
  CorrespondenceAttachment,
  CorrespondenceAttachments,
} from "../../types/sent/CorrespondenceAttache.type";
import { AttachmentDialog } from "../../components/sent";
import Transcript from "../../components/sent/sent_transcript";
import { useSentFormStore } from "../../store/sent/sent.store";

const SentForm = () => {
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
const {mutate:postCorrespondence} = useCorrespondenceAttachment.usePostCorrespondence()

  const attachmentOptions = [
    { label: "➕ اضافه کردن پیوست", value: "add_attachment" },
    ...(Attache
      ? Attache.map((attachment: CorrespondenceAttachment) => ({
          label: `${attachment.name} | ${attachment.user.first_name} ${attachment.user.last_name}`,
          value: attachment.file,
        }))
      : []),
  ];

  const internalUserOptions =
    (Position as PositionTypes[])?.map((position) => ({
      label: `${position.user.first_name} ${position.user.last_name} | ${position.user.uniqueIdentifier}`,
      value: position.user.uniqueIdentifier,
    })) || [];

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
    const payload = {
      subject: formData.subject,
      text: formData.text,
      description: formData.description,
      attachments: formData.attachments,
      receiver_internal: Number(formData.receiver_internal),
      receiver_external: formData.receiver_external,
      is_internal: formData.receiver_external === "internal",
      postcript: formData.postcript,
      seal: formData.seal,
      signature: formData.signature,
      letterhead: formData.letterhead,
      binding: formData.binding,
      confidentiality_level: formData.confidentiality_level,
      priority: formData.priority,
      kind_of_correspondence: formData.kind_of_correspondence,
      authority_type: formData.authority_type,
      authority_correspondence: Number(formData.authority_correspondence),
      reference: formData.reference.map(Number),
      published: true
    };
    postCorrespondence(payload);
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

  const letterTypeOptions = [
    { label: "اداری", value: "administrative" },
    { label: "رسمی", value: "formal" },
    { label: "غیر رسمی", value: "informal" },
    { label: "ارجاع", value: "referral" },
  ];

  const referralOptions = [
    { label: "اقدام لازم", value: "action_required" },
    { label: "جهت اطلاع", value: "for_information" },
    { label: "پیگیری", value: "follow_up" },
    { label: "بررسی و گزارش", value: "review_report" },
  ];

  const referralDetailsOptions = [
    { label: "مدیر عامل", value: "ceo" },
    { label: "معاون اداری", value: "admin_deputy" },
    { label: "معاون مالی", value: "financial_deputy" },
    { label: "مدیر منابع انسانی", value: "hr_manager" },
    { label: "مدیر فنی", value: "technical_manager" },
  ];

  const getTranscriptName = (id: string): string => {
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
                formData.receiver_external === "internal" ? "#1976d2" : "#94a3b8"
              }
              hoverColor={
                formData.receiver_external === "internal" ? "#1565c0" : "#64748b"
              }
            />
            <ButtonBase
              label="گیرنده خارجی"
              onClick={() => handleReceiverTypeChange("external")}
              bgColor={
                formData.receiver_external === "external" ? "#1976d2" : "#94a3b8"
              }
              hoverColor={
                formData.receiver_external === "external" ? "#1565c0" : "#64748b"
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
                onChange={(e) => handleChange("receiver_external", e.target.value)}
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
                onChange={(value) => handleChange("authority_correspondence", value)}
                options={referralDetailsOptions}
              />
            )}
            <SelectInput
              label="نوع نامه"
              value={formData.kind_of_correspondence}
              onChange={(value) => handleChange("kind_of_correspondence", value)}
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

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            <TextAreaInput
              label="متن پیام"
              value={formData.text}
              onChange={(e) => handleChange("text", e.target.value)}
              style={{ marginBottom: "1.5rem" }}
              rows={4}
            />
            <TextAreaInput
              label="توضیحات"
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              style={{ marginBottom: "1.5rem" }}
              rows={4}
            />
            <TextAreaInput
              label="پی نوشت"
              value={formData.postcript}
              onChange={(e) => handleChange("postcript", e.target.value)}
              style={{ marginBottom: "1.5rem" }}
              rows={4}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              gap: 2,
              mb: 3,
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={formData.seal}
                  onChange={(e) => handleChange("seal", e.target.checked)}
                  color="primary"
                />
              }
              label="مهر"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.signature}
                  onChange={(e) => handleChange("signature", e.target.checked)}
                  color="primary"
                />
              }
              label="امضا"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.letterhead}
                  onChange={(e) => handleChange("letterhead", e.target.checked)}
                  color="primary"
                />
              }
              label="سربرگ"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.binding}
                  onChange={(e) => handleChange("binding", e.target.checked)}
                  color="primary"
                />
              }
              label="تعهد آور"
            />
          </Box>

          <Transcript
            transcript={formData.reference.map(id => ({ id: String(id), enabled: true }))}
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
