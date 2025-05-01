import React from "react";
import { Grid } from "@mui/material";
import { TextAreaInput } from "../../../../components/common/inputs";
import { FormDataType } from "../../types/sent/sent.type";

interface MessageContentSectionProps {
  formData: FormDataType;
  handleChange: (name: string, value: string | string[] | boolean) => void;
  isMobile: boolean;
}

const MessageContentSection: React.FC<MessageContentSectionProps> = ({
  formData,
  handleChange,
  isMobile,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <TextAreaInput
          label="متن پیام"
          value={formData.text}
          onChange={(e) => handleChange("text", e.target.value)}
          rows={isMobile ? 6 : 8}
          className="enhanced-textarea"
          containerClassName="full-width"
        />
      </Grid>

      <Grid item xs={12}>
        <TextAreaInput
          label="پی نوشت"
          value={formData.postcript}
          onChange={(e) => handleChange("postcript", e.target.value)}
          rows={isMobile ? 1 : 2}
          className="enhanced-textarea"
        />
      </Grid>
    </>
  );
};

export default MessageContentSection; 