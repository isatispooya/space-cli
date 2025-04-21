import { Box, Typography, Paper } from "@mui/material";
import {
  FormInput,
  SelectInput,
  TextAreaInput,
} from "../../../../components/common/inputs";
import { ButtonBase } from "../../../../components/common/buttons";
import { useState } from "react";

const SentUpdateForm = () => {
  const [formData, setFormData] = useState({
    receiver: "",
    subject: "",
    priority: "",
    department: "",
    content: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) {
      e.preventDefault();
    }
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

  return (
    <Box sx={{ p: 3, maxWidth: 800, margin: "0 auto" }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography
          variant="h5"
          sx={{ mb: 3, fontWeight: "bold", color: "#1976d2" }}
        >
            ویرایش پیام
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 2,
              mb: 3,
            }}
          >
            <FormInput
              label="گیرنده"
              value={formData.receiver}
              onChange={(e) => handleChange("receiver", e.target.value)}
            />
            <FormInput
              label="موضوع"
              value={formData.subject}
              onChange={(e) => handleChange("subject", e.target.value)}
            />
            <SelectInput
              label="اولویت"
              value={formData.priority}
              onChange={(value) => handleChange("priority", value)}
              options={priorityOptions}
            />
            <SelectInput
              label="دپارتمان"
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
          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <ButtonBase
              label="ویرایش پیام"
              onClick={handleSubmit}
              bgColor="#1976d2"
              hoverColor="#1565c0"
            />
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default SentUpdateForm;
