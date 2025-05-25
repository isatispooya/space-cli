import { Box } from "@mui/material";
import { ButtonBase } from "../../../../components/common/buttons";
import { FormActionsPropsType } from "../../types/sent/form.type";

const FormActions: React.FC<FormActionsPropsType> = ({
  isEditMode,
  showPublishWarning,
  formData,
  onSubmit,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        mt: { xs: 1.5, sm: 2 },
        mb: { xs: 5.5, sm: 5 },
      }}
    >
      <ButtonBase
        label={
          showPublishWarning
            ? formData.published
              ? "ویرایش و حفظ انتشار"
              : "ویرایش پیام"
            : isEditMode
            ? "ویرایش پیام"
            : "ثبت پیام"
        }
        onClick={onSubmit}
        bgColor="#1976d2"
        hoverColor="#1565c0"
      />
    </Box>
  );
};

export default FormActions;
