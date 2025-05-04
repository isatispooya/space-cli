import { Box } from "@mui/material";
import React from "react";
import { SelectInput } from "../../../../components/common/inputs";
import { PrioritySectionProps } from "../../types/sent/sent.type";

const PrioritySection: React.FC<PrioritySectionProps> = ({
  formData,
  handleChange,
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
}) => (
  <Box display="flex" flexDirection="column" gap={{ xs: 1, sm: 2 }}>
    <SelectInput
      label="اولویت"
      value={formData.priority || ""}
      onChange={(value) => handleChange("priority", value)}
      options={priorityOptions}
      className="enhanced-select"
    />
    <SelectInput
      label="طبقه بندی"
      value={formData.confidentiality_level || ""}
      onChange={(value) => handleChange("confidentiality_level", value)}
      options={departmentOptions}
      className="enhanced-select"
    />
    <SelectInput
      label="نوع نامه"
      value={formData.kind_of_correspondence || ""}
      onChange={(value) => handleChange("kind_of_correspondence", value)}
      options={letterTypeOptions}
      className="enhanced-select"
    />
  </Box>
);

export default PrioritySection; 