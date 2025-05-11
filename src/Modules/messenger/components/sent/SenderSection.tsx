import { Box } from "@mui/material";
import React from "react";
import { FormInput, SelectInput } from "../../../../components/common/inputs";
import { SenderSectionPropsType } from "../../types/sent/sent.type";

const SenderSection: React.FC<SenderSectionPropsType> = ({
  formData,
  handleChange,
  senderUserOptions,
  senderUserOptionsOut,
  useInternalReceiver,
  internalUserOptions,
}) => (
  <Box display="flex" flexDirection="column" gap={{ xs: 1, sm: 2 }}>
    {useInternalReceiver ? (
      <>
        <SelectInput
          label="ارسال کننده"
          value={formData.sender?.toString() || ""}
          onChange={(value) => handleChange("sender", value)}
          options={senderUserOptions}
          className="enhanced-select"
        />

        <SelectInput
          label="گیرنده داخلی"
          value={formData.receiver_internal?.toString() || ""}
          onChange={(value) => handleChange("receiver_internal", value)}
          options={internalUserOptions}
          className="enhanced-select"
        />
      </>
    ) : (
      <>
        <SelectInput
          label="ارسال کننده"
          value={formData.sender?.toString() || ""}
          onChange={(value) => handleChange("sender", value)}
          options={senderUserOptionsOut}
          className="enhanced-select"
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
    <FormInput
      label="موضوع"
      value={formData.subject || ""}
      onChange={(e) => handleChange("subject", e.target.value)}
      className="enhanced-input"
    />
  </Box>
);

export default SenderSection;
