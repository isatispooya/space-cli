import React, { memo } from "react";
import { Box, FormControlLabel, Switch } from "@mui/material";
import { STYLES } from "@/Modules/messenger/style";
import { FORM_SWITCHES, FormSwitchType } from "@/Modules/messenger/data/sent/sent_inputs";
import { FormSwitchPropsType } from "@/Modules/messenger/types/sent/switch.type";

const FormSwitches: React.FC<FormSwitchPropsType> = memo(({ formData, handleChange }) => (
  <Box sx={STYLES.switchGroup}>
    {FORM_SWITCHES.map(({ field, label }: FormSwitchType) => (
      <FormControlLabel
        key={field}
        control={
          <Switch
            checked={formData[field]}
            onChange={(e) => handleChange(field, e.target.checked)}
            color="primary"
            disabled={formData.published && field !== "published"}
          />
        }
        label={label}
      />
    ))}
  </Box>
));

export default FormSwitches;
