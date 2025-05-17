export interface SenderSectionType {
  formData: {
    sender?: string | number;
    sender_details?: {
      user?: {
        id?: string | number;
      };
    };
    receiver_internal?: string | number;
    receiver_internal_details?: {
      id?: string | number;
    };
    receiver_external?: string;
    subject?: string;
    [key: string]: unknown;
  };
  handleChange: (field: string, value: unknown) => void;
  senderUserOptions: Array<{ value: string; label: string }>;
  senderUserOptionsOut: Array<{ value: string; label: string }>;
  useInternalReceiver: boolean;
  internalUserOptions: Array<{ value: string; label: string }>;
}
