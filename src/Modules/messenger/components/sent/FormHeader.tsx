import React, { memo } from "react";
import { Typography, Alert } from "@mui/material";
import { STYLES } from "../../style";
import { FormHeaderPropsType } from "../../types/sent/form.type";

const FormHeader: React.FC<FormHeaderPropsType> = memo(({
  isEditMode,
  showPublishWarning,
}) => (
  <>
    <Typography
      variant="h5"
      sx={{
        ...STYLES.title,
        fontSize: { xs: "1.2rem", sm: "1.5rem" },
        mb: { xs: 2, sm: 3 },
      }}
    >
      {isEditMode ? "ویرایش پیام" : "ثبت پیام جدید"}
    </Typography>

    {showPublishWarning && (
      <Alert severity="warning" sx={{ mb: 3 }}>
        این پیام منتشر شده است. در صورت ذخیره تغییرات، وضعیت انتشار به روز
        خواهد شد.
      </Alert>
    )}
  </>
));

export default FormHeader;
