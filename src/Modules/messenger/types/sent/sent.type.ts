export interface BaseUserType {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier?: string;
}

export interface SentMessageType {
  id: number;
  title: string;
  receiver: string;
  sender: string;
  send_date: string;
  status: string;
  message_type: string;
}

export interface CorrespondenceAttachmentType {
  id: number;
  user: BaseUserType;
  name: string;
  file: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface ReferenceDataType {
  id: number;
  enabled: boolean;
  transcript_for: string;
  external_text?: string;
}

export interface TranscriptDataType {
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  position: number;
  correspondence: number | null;
  external_text?: string;
}

export interface TranscriptAPIDataType {
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  position: number;
  correspondence: number | null;
  external_text?: string;
}

export interface APIFormDataType {
  subject: string;
  text: string;
  description: string;
  attachments: number[];
  receiver: number[];
  sender: number;
  receiver_internal: number | null;
  receiver_external: string;
  receiver_internal_details?: ReceiverInternalDetailsType;
  sender_details?: SenderDetailsType;
  is_internal: boolean;
  postcript: string;
  seal: boolean;
  signature: boolean;
  letterhead: boolean;
  binding: boolean;
  confidentiality_level: string;
  priority: string;
  kind_of_correspondence: string;
  authority_type: string;
  authority_correspondence: number | null;
  reference: number[];
  transcript: TranscriptAPIDataType[];
  published: boolean;
}

export type FormDataType = {
  subject: string;
  text: string;
  description: string;
  attachments: number[];
  receiver: number[];
  sender: number;
  receiver_internal: number | null;
  receiver_external: string;
  is_internal: boolean;
  postcript: string;
  seal: boolean;
  signature: boolean;
  letterhead: boolean;
  binding: boolean;
  confidentiality_level: string;
  priority: string;
  kind_of_correspondence: string;
  authority_type: string;
  authority_correspondence: number | null;
  reference: number[];
  referenceData?: ReferenceDataType[];
  transcript: TranscriptDataType[];
  published: boolean;
};

export interface AttachmentResponseType {
  id: number;
  name: string;
  file: string;
  size: number;
}

export interface SenderDetailsType {
  user: BaseUserType;
  name?: string;
  company_detail?: {
    seal: string;
    logo: string;
    address: string;
    phone: string;
    name: string;
  };
}

export interface ReceiverInternalDetailsType {
  id: number;
  user: BaseUserType;
  name?: string;
  company_detail?: {
    logo: string;
    address: string;
    phone: string;
    name: string;
  };
}

export interface CorrespondenceItemType {
  id: number;
  subject: string;
  sender_details: SenderDetailsType;
  receiver_internal_details: ReceiverInternalDetailsType;
  receiver_external: string;
  is_internal: boolean;
  created_at: string;
  priority: string;
  number: string;
  name: string;
  classification?: string;
  confidentiality_level?: string;
}

export interface CorrespondenceResponseType {
  sender: CorrespondenceItemType[];
  receiver: CorrespondenceItemType[];
}

export type CorrespondenceAttachmentsType = CorrespondenceAttachmentType[];

export interface TranscriptDetailsType {
  id: number;
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  created_at: string;
  updated_at: string;
  position: number;
  correspondence: number;
}

export interface AttachmentType {
  id: number;
  user: BaseUserType;
  name: string;
  file: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface PositionType {
  id: number;
  name: string;
  user?: BaseUserType;
  signature?: string;
  seal?: string;
}

export interface SenderType {
  created_at: string;
  attachments_details?: CorrespondenceAttachmentType[];
  number: string;
  confidentiality_level?: string;
  subject: string;
  sender_details?: SenderDetailsType;
  receiver_internal_details?: ReceiverInternalDetailsType;
  receiver_external?: string;
  is_internal: boolean;
  text: string;
  content?: string;
  transcript_details: TranscriptDetailsType[];
  postcript?: string;
  published?: boolean;
  letterhead?: boolean;
}

export interface MatchedUserType {
  position: string;
  id: number;
  firstName: string;
  lastName: string;
}

export interface MessageHeaderPropsType {
  sender: SenderType;
  formattedDate: string;
}

export interface MessageContentPropsType {
  sender: SenderType;
  signature?: PositionType[];
  allposition?: PositionType[];
  seal?: string;
}

export interface MessageFooterPropsType {
  sender: SenderType;
  matchedUsers?: MatchedUserType[];
}

export interface SelectOptionType {
  label: string;
  value: string;
}

export interface FormOptionsType {
  priorityOptions: SelectOptionType[];
  departmentOptions: SelectOptionType[];
  letterTypeOptions: SelectOptionType[];
  senderUserOptions: SelectOptionType[];
  internalUserOptions: SelectOptionType[];
  attachmentOptions: SelectOptionType[];
}

export interface SectionPropsType {
  formData: APIFormDataType;
  handleChange: (name: string, value: string | boolean | string[]) => void;
}

export interface SenderSectionPropsType extends SectionPropsType {
  senderUserOptions: SelectOptionType[];
  senderUserOptionsOut: SelectOptionType[];
  useInternalReceiver: boolean;
  internalUserOptions: SelectOptionType[];
}

export interface PrioritySectionPropsType extends SectionPropsType {
  priorityOptions: SelectOptionType[];
  departmentOptions: SelectOptionType[];
  letterTypeOptions: SelectOptionType[];
}

export interface AttachmentSectionPropsType extends SectionPropsType {
  setOpenFileDialog: (open: boolean) => void;
  attachmentOptions: SelectOptionType[];
}

export interface ITranscriptResponseType {
  id: number;
  read_at: string | null;
  transcript_for: "notification" | "security" | string;
  security: boolean;
  created_at: string;
  updated_at: string;
  position: number;
  correspondence: number;
  external_text?: string;
}
