import React from "react";
import { Grid, Box } from "@mui/material";
import { FormInput, SelectInput } from "../../../../components/common/inputs";
import { FormDataType } from "../../types/sent/CorrespondenceAttache.type";
import ReceiverTypeButtons from "./ReceiverTypeButtons";

interface SenderReceiverSectionProps {
  formData: FormDataType;
  handleChange: (name: string, value: string | string[] | boolean) => void;
  useInternalReceiver: boolean;
  setUseInternalReceiver: (useInternal: boolean) => void;
  positionOptions: { label: string; value: string }[];
}

const SenderReceiverSection: React.FC<SenderReceiverSectionProps> = ({
  formData,
  handleChange,
  useInternalReceiver,
  setUseInternalReceiver,
  positionOptions,
}) => {
  return (
    <>
      <Grid item xs={12}>
        <ReceiverTypeButtons
          receiverType={useInternalReceiver ? "internal" : "external"}
          onTypeChange={(type) => setUseInternalReceiver(type === "internal")}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={{ xs: 2, sm: 3 }}>
          <Grid item xs={12} md={6}>
            <Box
              display="flex"
              flexDirection="column"
              gap={{ xs: 1, sm: 2 }}
            >
              <SelectInput
                label="ارسال کننده"
                value={formData.sender.toString()}
                onChange={(value) => handleChange("sender", value)}
                options={positionOptions}
                className="enhanced-select"
              />

              {useInternalReceiver ? (
                <SelectInput
                  label="گیرنده داخلی"
                  value={formData.receiver_internal?.toString() || ""}
                  onChange={(value) => handleChange("receiver_internal", value)}
                  options={positionOptions}
                  className="enhanced-select"
                />
              ) : (
                <FormInput
                  label="گیرنده خارجی"
                  value={formData.receiver_external}
                  onChange={(e) => handleChange("receiver_external", e.target.value)}
                  placeholder="گیرنده خارجی"
                  className="enhanced-input"
                />
              )}

              <FormInput
                label="موضوع"
                value={formData.subject}
                onChange={(e) => handleChange("subject", e.target.value)}
                className="enhanced-input"
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SenderReceiverSection; 