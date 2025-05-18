export interface SenderSectionType {
  formData: {
    sender: string;
    sender_details?: {
      user?: {
        id?: string;
      };
    };
    receiver_internal: string;
    receiver_internal_details?: {
      id?: string;
    };
    receiver_external: string;
    subject: string;
  };
  handleChange: (field: string, value: string) => void;
  senderUserOptions: Array<{ value: string; label: string }>;
  senderUserOptionsOut: Array<{ value: string; label: string }>;
  useInternalReceiver: boolean;
  internalUserOptions: Array<{ value: string; label: string }>;
}
