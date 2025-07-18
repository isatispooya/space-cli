import { Box } from "@mui/material";
import React from "react";
import { SelectInput } from "../../../../components/common/inputs";
import { PrioritySectionPropsType } from "../../types/sent/SenderSection.Type";
import {
  priorityDefault,
  departmentDefault,
  letterTypeDefault,
} from "../../data/sent/sent.data";

const PrioritySection: React.FC<PrioritySectionPropsType> = ({
  formData,
  handleChange,
  priorityOptions,
  departmentOptions,
  letterTypeOptions,
}) => (
  <Box display="flex" flexDirection="column" gap={{ xs: 1, sm: 2 }}>
    <SelectInput
      label="اولویت"
      value={formData.priority || priorityDefault}
      onChange={(value) => handleChange("priority", value)}
      options={priorityOptions}
      className="enhanced-select"
    />
    <SelectInput
      label="طبقه بندی"
      value={formData.confidentiality_level || departmentDefault}
      onChange={(value) => handleChange("confidentiality_level", value)}
      options={departmentOptions}
      className="enhanced-select"
    />
    <SelectInput
      label="نوع نامه"
      value={formData.kind_of_correspondence || letterTypeDefault}
      onChange={(value) => handleChange("kind_of_correspondence", value)}
      options={letterTypeOptions}
      className="enhanced-select"
    />
  </Box>
);

export default PrioritySection;
