import { TranscriptDetailType } from "../logic.type";
import { CorrespondenceAttachmentType } from "./attachment.type";
import {
  TranscriptAPIDataType,
  TranscriptDataType,
  TranscriptDetailsType,
} from "./transcript.type";

// Base Types
export interface BaseUserType {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier?: string;
}

export type FormValueType =
  | string
  | number
  | boolean
  | Array<string | number>
  | null;

export interface SelectOptionType {
  label: string;
  value: string;
}

// Reference Types
export interface ReferenceDataType {
  id: number;
  enabled: boolean;
  transcript_for: string;
  user_external?: string;
}

// Form Types
export interface APIFormDataType {
  subject: string;
  text: string;
  description: string;
  attachments: number[];
  receiver: number[];
  sender: number | null;
  receiver_internal: number | null;
  receiver_external: string | null;
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
  owner: number | null;
  owner_details: PositionType | null;
  sender_external: string;
}

export type FormDataType = {
  subject: string;
  text: string;
  description: string;
  attachments: number[];
  receiver: number[];
  sender: number | null;
  receiver_internal: number | null;
  receiver_external: string | null;
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
  owner: number | null;
  owner_details: PositionType | null;
  transcript_details: TranscriptDetailType[];
  sender_external: string;
};

// Details Types
export interface SenderDetailsType {
  id: number;
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

// Correspondence Types
export interface CorrespondenceItemType {
  id: number;
  subject: string;
  sender_details: SenderDetailsType;
  receiver_internal_details: ReceiverInternalDetailsType;
  receiver_external: string;
  is_internal: boolean;
  created_at: string;
  read_at: string;
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

// Position Types
export interface PositionType {
  id: number;
  name: string;
  user?: BaseUserType;
  signature?: string;
  seal?: string;
}

export interface SenderType {
  created_at: string;
  read_at: string;
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

export interface SentFormStateType {
  formData: FormDataType;
  openFileDialog: boolean;
  selectedTranscript: string[];
  transcriptDirections: Record<number, string>;
  attachmentOptions: SelectOptionType[];
  setFormData: (data: Partial<FormDataType>) => void;
  setOpenFileDialog: (isOpen: boolean) => void;
  setSelectedTranscript: (transcripts: string[]) => void;
  setTranscriptDirection: (id: number, direction: string) => void;
  setAttachmentOptions: (options: SelectOptionType[]) => void;
  handleChange: (name: string, value: FormValueType) => void;
  handleReceiverTypeChange: (type: string) => void;
  handleAttachmentAdd: (attachmentData: { name: string; id: number }) => void;
  handleAddTranscript: (externalTranscriptText?: string) => void;
  handleTranscriptToggle: (id: number) => void;
  handleDeleteTranscript: (id: number) => void;
  handleDeleteTranscriptFromStore: (id: number) => void;
  resetForm: () => void;
}
