import { CorrespondenceAttachmentType } from "./attachment.type";
import {
  TranscriptAPIDataType,
  TranscriptDataType,
  TranscriptDetailsType,
} from "./transcript.type";

export interface BaseUserType {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier?: string;
}

export interface ReferenceDataType {
  id: number;
  enabled: boolean;
  transcript_for: string;
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
  owner: number;
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
  owner: number;
};

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
