import React from "react";
import { Grid, Box, Divider } from "@mui/material";
import FormSwitches from "./switch";
import { FormDataType } from "../../types/sent/CorrespondenceAttache.type";

interface FormSwitchesSectionProps {
  formData: FormDataType;
  handleChange: (name: string, value: string | string[] | boolean) => void;
}

const FormSwitchesSection: React.FC<FormSwitchesSectionProps> = ({
  formData,
  handleChange,
}) => {
  return (
    <Grid item xs={12}>
      <Divider sx={{ my: { xs: 1.5, sm: 2 } }} />
      <Grid container spacing={{ xs: 2, sm: 3 }}>
        <Grid item xs={12}>
          <Box sx={{ mt: 1 }}>
            <FormSwitches
              formData={formData}
              handleChange={handleChange}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FormSwitchesSection; 