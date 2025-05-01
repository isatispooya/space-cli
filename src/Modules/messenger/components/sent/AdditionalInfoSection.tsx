import React from "react";
import { Grid } from "@mui/material";
import { TextAreaInput, SelectInput } from "../../../../components/common/inputs";
import { FormDataType } from "../../types/sent/sent.type";

interface AdditionalInfoSectionProps {
  formData: FormDataType;
  handleChange: (name: string, value: string | string[] | boolean) => void;
  referralOptions: { label: string; value: string }[];
  referralDetailsOptions: { label: string; value: string }[];
}

const AdditionalInfoSection: React.FC<AdditionalInfoSectionProps> = ({
  formData,
  handleChange,
  referralOptions,
  referralDetailsOptions,
}) => {
  return (
    <Grid item xs={12}>
      <Grid container spacing={{ xs: 2, sm: 2 }}>
        <Grid item xs={12} md={4}>
          <TextAreaInput
            label="توضیحات"
            value={formData.description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            rows={1}
            className="enhanced-textarea"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <SelectInput
            label="نوع ارجاع"
            value={formData.authority_type || ""}
            onChange={(value) => handleChange("authority_type", value)}
            options={referralOptions}
            className="enhanced-select"
          />
        </Grid>
        {formData.authority_type && (
          <Grid item xs={12} md={4}>
            <SelectInput
              label="ارجاع"
              value={formData.authority_correspondence?.toString() || ""}
              onChange={(value) => handleChange("authority_correspondence", value)}
              options={referralDetailsOptions}
              className="enhanced-select"
            />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default AdditionalInfoSection; 