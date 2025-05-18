
export interface ReceiverTypeButtonsPropsType {
    receiverType: string;
    onTypeChange: (type: "internal" | "external") => void;
    onIsInternalChange?: (isInternal: boolean) => void;
  }