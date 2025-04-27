import React from "react";
import { Grid, Box, Typography } from "@mui/material";
import { SelectInput, MultiSelect } from "../../../../components/common/inputs";
import { FormDataType } from "../../types/sent/CorrespondenceAttache.type";

interface MessageOptionsSectionProps {
  formData: FormDataType;
  handleChange: (name: string, value: string | string[] | boolean) => void;
  setOpenFileDialog: (isOpen: boolean) => void;
  priorityOptions: { label: string; value: string }[];
  departmentOptions: { label: string; value: string }[];
  letterTypeOptions: { label: string; value: string }[];
  attachmentOptions: { label: string; value: string }[];
}

const MessageOptionsSection: React.FC<MessageOptionsSectionProps> = ({
  formData,
  handleChange,
  setOpenFileDialog,
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
  attachmentOptions,
}) => {
  return (
    <Grid item>
      <Grid container spacing={{ xs: 2, sm: 2 }}>
        <Grid item mt={8}>
          <Box display="flex" flexDirection="column" gap={{ xs: 1, sm: 2 }}>
            <SelectInput
              label="اولویت"
              value={formData.priority}
              onChange={(value) => handleChange("priority", value)}
              options={priorityOptions}
              className="enhanced-select"
            />
            <SelectInput
              label="محرمانگی"
              value={formData.confidentiality_level}
              onChange={(value) => handleChange("confidentiality_level", value)}
              options={departmentOptions}
              className="enhanced-select"
            />
            <SelectInput
              label="نوع نامه"
              value={formData.kind_of_correspondence}
              onChange={(value) =>
                handleChange("kind_of_correspondence", value)
              }
              options={letterTypeOptions}
              className="enhanced-select"
            />
          </Box>
        </Grid>

        <Grid item>
          <Box
            display="flex"
            flexDirection="column"
            mt={10}
            gap={{ xs: 1, sm: 2 }}
          >
            <Box
              sx={{
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
              selectedValues={formData.attachments.map(String)}
              onChange={(value) => handleChange("attachments", value)}
              options={attachmentOptions}
              className="enhanced-select"
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default MessageOptionsSection;
