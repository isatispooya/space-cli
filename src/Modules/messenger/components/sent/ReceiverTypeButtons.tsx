import React from 'react';
import { Box } from "@mui/material";
import { ButtonBase } from "../../../../components/common/buttons";


interface ReceiverTypeButtonsProps {
  receiverType: string;
  onTypeChange: (type: "internal" | "external") => void;
  onIsInternalChange?: (isInternal: boolean) => void;
}

const ReceiverTypeButtons: React.FC<ReceiverTypeButtonsProps> = ({ 
  receiverType, 
  onTypeChange,
  onIsInternalChange 
}) => {
  
  const handleTypeChange = (type: "internal" | "external") => {
    onTypeChange(type);
    if (onIsInternalChange) {
      onIsInternalChange(type === "internal");
    }
  };
  
  return (
    <Box display="flex" mb={4}>
      <ButtonBase
        label="گیرنده داخلی"
        onClick={() => handleTypeChange("internal")}
        bgColor={receiverType === "internal" ? "#1976d2" : "#94a3b8"}
        hoverColor={receiverType === "internal" ? "#1565c0" : "#64748b"}
      />
      <ButtonBase
        label="گیرنده خارجی"
        onClick={() => handleTypeChange("external")}
        bgColor={receiverType === "external" ? "#1976d2" : "#94a3b8"}
        hoverColor={receiverType === "external" ? "#1565c0" : "#64748b"}
      />
    </Box>
  );
};

export default ReceiverTypeButtons;
