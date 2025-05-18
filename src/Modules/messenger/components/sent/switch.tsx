import { STYLES } from "@/Modules/messenger/style";

import { FORM_SWITCHES } from "@/Modules/messenger/data/sent/sent_inputs";
import { FormControlLabel } from "@mui/material";

import { Switch } from "@mui/material";

import { Box } from "@mui/material";
import { FormDataType } from "@/Modules/messenger/types/sent/sent.type";

const FormSwitches: React.FC<{
  formData: FormDataType;
  handleChange: (name: string, value: boolean) => void;
}> = ({ formData, handleChange }) => (
  <Box sx={STYLES.switchGroup}>
    {FORM_SWITCHES.map(({ field, label }) => (
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
);

export default FormSwitches;
