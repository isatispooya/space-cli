import { Typography, Alert } from "@mui/material";
import { STYLES } from "../../style";
import { useLocation } from "react-router-dom";
import FormHeaderPropsType from "../../types/sent/FormHeader.type";

const FormHeader: React.FC<FormHeaderPropsType> = ({
  isEditMode,
  showPublishWarning,
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isInternal =
    pathname.includes("/letter/form") ||
    pathname.includes("/letter/update-form");
  const isUpdateForm = pathname.includes("/letter/update-form");

  let title = "";

  if (isUpdateForm) {
    title = isInternal ? "ویرایش پیام داخلی" : "ویرایش پیام خارجی";
  } else if (isEditMode) {
    title = isInternal ? "ویرایش پیام داخلی" : "ویرایش پیام خارجی";
  } else {
    title = isInternal ? "ثبت پیام جدید داخلی" : "ثبت پیام جدید خارجی";
  }

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
        {title}
      </Typography>

      {showPublishWarning && (
        <Alert severity="warning" sx={{ mb: 3 }}>
          این پیام منتشر شده است. در صورت ذخیره تغییرات، وضعیت انتشار به‌روز
          خواهد شد.
        </Alert>
      )}
    </>
  );
};

export default FormHeader;
