import React from 'react';
import { Box } from "@mui/material";
import { ButtonBase } from "../../../../components/common/buttons";

const STYLES = {
  buttonGroup: {
    mb: 3,
    display: "flex",
    justifyContent: "center",
  },
} as const;

interface ReceiverTypeButtonsProps {
  receiverType: string;
  onTypeChange: (type: "internal" | "external") => void;
}

const ReceiverTypeButtons: React.FC<ReceiverTypeButtonsProps> = ({ receiverType, onTypeChange }) => (
  <Box sx={STYLES.buttonGroup}>
    <ButtonBase
      label="گیرنده داخلی"
      onClick={() => onTypeChange("internal")}
      bgColor={receiverType === "internal" ? "#1976d2" : "#94a3b8"}
      hoverColor={receiverType === "internal" ? "#1565c0" : "#64748b"}
    />
    <ButtonBase
      label="گیرنده خارجی"
      onClick={() => onTypeChange("external")}
      bgColor={receiverType === "external" ? "#1976d2" : "#94a3b8"}
      hoverColor={receiverType === "external" ? "#1565c0" : "#64748b"}
    />
  </Box>
);

export default ReceiverTypeButtons;
