import { Typography, Alert } from "@mui/material";
import { STYLES } from "../../style";
import { useLocation } from "react-router-dom";
import FormHeaderPropsType from "../../types/sent/FormHeader.type";

const FormHeader: React.FC<FormHeaderPropsType> = ({
  isEditMode,
  showPublishWarning,
}) => {
  const location = useLocation();
  const isInternal = location.pathname === "/letter/form";
  return (
    <>
      <Typography
        variant="h5"
        sx={{
          ...STYLES.title,
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
          mb: { xs: 2, sm: 3 },
        }}
      >
        {isEditMode
          ? isInternal
            ? "پیش نویس پیام داخلی"
            : "پیش نویس پیام خارجی"
          : isInternal
          ? "ثبت پیام جدید داخلی"
          : "ثبت پیام جدید خارجی"}
      </Typography>

      {showPublishWarning && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          این پیام منتشر شده است. در صورت ذخیره تغییرات، وضعیت انتشار به روز
          خواهد شد.
        </Alert>
      )}
    </>
  );
};

export default FormHeader;
