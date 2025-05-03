export interface BaseUser {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier?: string;
}

export interface SentMessage {
  id: number;
  title: string;
  receiver: string;
  sender: string;
  send_date: string;
  status: string;
  message_type: string;
}

export interface CellComponent {
  getElement: () => HTMLElement;
  getRow: () => { getData: () => SentMessage };
}

export interface CorrespondenceAttachment {
  id: number;
  user: BaseUser;
  name: string;
  file: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface ReferenceData {
  id: number;
  enabled: boolean;
  transcript_for: string;
}

export interface TranscriptData {
  read_at: string;
  transcript_for: string;
  security: boolean;
  position: number;
  correspondence: number | null;
}

export interface TranscriptAPIData {
  read_at: string;
  transcript_for: string;
  security: boolean;
  position: number;
  correspondence: number | null;
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
  transcript: TranscriptAPIData[];
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
  referenceData?: ReferenceData[];
  transcript: TranscriptData[];
  published: boolean;
};

export interface AttachmentResponse {
  id: number;
  name: string;
  file: string;
  size: number;
}

export interface SenderDetails {
  user: BaseUser;
}

export interface ReceiverInternalDetails {
  user: BaseUser;
}

export interface CorrespondenceItem {
  id: number;
  subject: string;
  sender_details: SenderDetails;
  receiver_internal_details: ReceiverInternalDetails;
  receiver_external: string;
  is_internal: boolean;
  created_at: string;
  priority: string;
}

export interface CorrespondenceResponse {
  sender: CorrespondenceItem[];
  receiver: CorrespondenceItem[];
}

export type CorrespondenceAttachments = CorrespondenceAttachment[];

export interface TranscriptDetails {
  id: number;
  read_at: string | null;
  transcript_for: string;
  security: boolean;
  created_at: string;
  updated_at: string;
  position: number;
  correspondence: number;
}

export interface Attachment {
  id: number;
  user: BaseUser;
  name: string;
  file: string;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface Position {
  id: number;
  name: string;
  user?: BaseUser;
}

export interface SenderType {
  created_at: string;
  attachments_details?: CorrespondenceAttachment[];
  number: string;
  confidentiality_level?: string;
  subject: string;
  sender_details?: SenderDetails;
  receiver_internal_details?: ReceiverInternalDetails;
  receiver_external?: string;
  is_internal: boolean;
  text: string;
  transcript_details: TranscriptDetails[];
  postcript?: string;
}

export interface MatchedUser {
  position: string;
  id: number;
  firstName: string;
  lastName: string;
}

export interface MessageHeaderProps {
  sender: SenderType;
  formattedDate: string;
}

export interface MessageContentProps {
  sender: SenderType;
}

export interface MessageFooterProps {
  sender: SenderType;
  matchedUsers?: MatchedUser[];
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface FormOptions {
  priorityOptions: SelectOption[];
  departmentOptions: SelectOption[];
  letterTypeOptions: SelectOption[];
  senderUserOptions: SelectOption[];
  internalUserOptions: SelectOption[];
  attachmentOptions: SelectOption[];
}

interface SectionProps {
  formData: APIFormDataType;
  handleChange: (name: string, value: string | boolean | string[]) => void;
}

export interface SenderSectionProps extends SectionProps {
  senderUserOptions: SelectOption[];
  useInternalReceiver: boolean;
  internalUserOptions: SelectOption[];
}

export interface PrioritySectionProps extends SectionProps {
  priorityOptions: SelectOption[];
  departmentOptions: SelectOption[];
  letterTypeOptions: SelectOption[];
}

export interface AttachmentSectionProps extends SectionProps {
  setOpenFileDialog: (open: boolean) => void;
  attachmentOptions: SelectOption[];
}

export interface ITranscriptResponse {
  id: number;
  read_at: string | null;
  transcript_for: "notification" | "security" | string;
  security: boolean;
  created_at: string;
  updated_at: string;
  position: number;
  correspondence: number;
}
