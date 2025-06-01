import { Box } from "@mui/material";
import React from "react";
import { FormInput, SelectInput } from "../../../../components/common/inputs";
import { SenderSectionPropsType } from "../../types/sent/SenderSection.Type";
import { useLocation } from "react-router-dom";

const SenderSection: React.FC<SenderSectionPropsType> = ({
  formData,
  handleChange,
  senderUserOptions,
  internalUserOptions,
}) => {
  const location = useLocation();
  const showExternalReceiver =
    (!formData.is_internal && location.pathname !== "/letter/form") || location.pathname === "/letter/Outform";

  return (
    <Box display="flex" flexDirection="column" gap={{ xs: 1, sm: 2 }}>
      {!showExternalReceiver ? (
        <>
          <SelectInput
            label="ارسال کننده"
            value={
              (
                formData.sender || formData.sender_details?.user?.id
              )?.toString() || ""
            }
            onChange={(value) => handleChange("sender", value)}
            options={senderUserOptions}
            className="enhanced-select"
          />
          <SelectInput
            label="گیرنده داخلی"
            value={
              (
                formData.receiver_internal ||
                formData.receiver_internal_details?.id
              )?.toString() || ""
            }
            onChange={(value) => handleChange("receiver_internal", value)}
            options={internalUserOptions}
            className="enhanced-select"
          />
        </>
      ) : (
        <>
          <FormInput
            label="ارسال کننده خارجی"
            value={formData.sender_external || ""}
            onChange={(e) => handleChange("sender_external", e.target.value)}
            placeholder="گیرنده خارجی"
            className="enhanced-input"
          />
          <FormInput
            label="گیرنده خارجی"
            value={formData.receiver_external || ""}
            onChange={(e) => handleChange("receiver_external", e.target.value)}
            placeholder="گیرنده خارجی"
            className="enhanced-input"
          />
        </>
      )}

      <SelectInput
        label="مالک"
        value={formData.owner?.toString() || ""}
        onChange={(value) => handleChange("owner", value)}
        options={internalUserOptions}
        className="enhanced-select"
      />

      <FormInput
        label="موضوع"
        value={formData.subject || ""}
        onChange={(e) => handleChange("subject", e.target.value)}
        className="enhanced-input"
      />
    </Box>
  );
};

export default SenderSection;
