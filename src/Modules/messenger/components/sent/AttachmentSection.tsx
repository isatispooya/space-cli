import { Box, Typography } from "@mui/material";
import React from "react";
import { MultiSelect } from "../../../../components/common/inputs";
import { AttachmentSectionPropsType } from "../../types/sent/sent.type";

const AttachmentSection: React.FC<AttachmentSectionPropsType> = ({
  setOpenFileDialog,
  formData,
  handleChange,
  attachmentOptions,
}) => (
  <Box display="flex" flexDirection="column" gap={{ xs: 1, sm: 2 }}>
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
      <Typography variant="h4" color="primary">+</Typography>
      <Typography variant="body2">افزودن پیوست</Typography>
    </Box>
    <MultiSelect
      label="پیوست‌ها"
      selectedValues={formData.attachments?.map(String) || []}
      onChange={(value) => handleChange("attachments", value.map(String))}
      options={attachmentOptions}
      className="enhanced-select"
    />
  </Box>
);

export default AttachmentSection; 