import { Box, Paper } from "@mui/material";
import { STYLES } from "../../style";

interface FormContainerPropsType {
  children: React.ReactNode;
}

const FormContainer: React.FC<FormContainerPropsType> = ({ children }) => {
  return (
    <Box
      sx={{
        ...STYLES.container,
        width: "100%",
        px: { xs: 1, sm: 2, md: 3 },
      }}
      className="sent-form-container"
    >
      <Paper
        elevation={3}
        sx={{
          ...STYLES.paper,
          p: { xs: 2, sm: 3 },
          overflow: "hidden",
        }}
      >
        {children}
      </Paper>
    </Box>
  );
};

export default FormContainer;
