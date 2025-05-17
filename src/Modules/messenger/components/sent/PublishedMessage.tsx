import React, { memo } from "react";
import { Box, Alert } from "@mui/material";
import { ButtonBase } from "../../../../components/common/buttons";
import FormContainer from "./FormContainer";
import { PublishedMessagePropsType } from "../../types/sent/publishedMessage.type";

const PublishedMessage: React.FC<PublishedMessagePropsType> = memo(({ onNavigateBack }) => (
  <FormContainer>
    <Alert severity="info" sx={{ mb: 3 }}>
      این پیام منتشر شده است و دیگر قابل ویرایش نیست.
    </Alert>
    <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
      <ButtonBase
        label="بازگشت به لیست پیام‌ها"
        onClick={onNavigateBack}
        bgColor="#1976d2"
        hoverColor="#1565c0"
      />
    </Box>
  </FormContainer>
));

export default PublishedMessage;
