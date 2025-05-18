import {
  TranscriptDetailType,
} from "./sentForm.types";
import { CorrespondenceAttachmentType } from "./attachment.type";

export interface SelectOptionType {
  label: string;
  value: string | number;
}

export interface ReferenceDataType {
  id: number;
  enabled: boolean;
  transcript_for: string;
  external_text?: string;
}

export interface TranscriptDataType {  read_at: string;  transcript_for: string;  security: boolean;  position: number;  correspondence: null;  external_text?: string | string[];}

export interface FormDataType {
  subject: string;
  text: string;
  description: string;
  attachments: number[];
  receiver_internal: number;
  receiver_external: string;
  receiver: number[];
  sender: number;
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
  authority_correspondence: null;
  reference: number[];
  referenceData: ReferenceDataType[];
  transcript: TranscriptDataType[];
  published: boolean;
}

export interface TranscriptDetailsType extends TranscriptDetailType {
  id: number;
  position: number;
  transcript_for: string;
  security: boolean;
}

export interface MatchedUserType {
  position: string;
  id: number;
  firstName: string;
  lastName: string;
}

export interface PositionType {
  id: number;
  name: string;
  company: number;
  parent: {
    id: number;
    name: string;
  } | null;
  type_of_employment: string | null;
  description: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  start_date: string;
  end_date: string;
  created_at?: string;
  sender: string;
  first_name: string;
  last_name: string;
  signature?: string;
  seal?: string;
  company_detail?: {
    id: number | string;
    name: string;
  };
}

export interface CompanyDetailType {
  name: string;
  logo: string;
  seal: string;
  address: string;
  phone: string;
}

export interface SenderDetailsType {
  user: {
    id: number;
    first_name: string;
    last_name: string;
  };
  name: string;
  company_detail: CompanyDetailType;
}

export interface ReceiverInternalDetailsType {
  user: {
    first_name: string;
    last_name: string;
  };
  name: string;
  company_detail: CompanyDetailType;
}

export interface SenderType {
  sender_details: SenderDetailsType;
  receiver_internal_details: ReceiverInternalDetailsType;
  receiver_external: string;
  is_internal: boolean;
  published: boolean;
  seal: boolean;
  signature: boolean;
  subject: string;
  transcript_details?: TranscriptDetailsType[];
  postcript: string;
  letterhead: boolean;
  attachments_details: CorrespondenceAttachmentType[];
  number: string;
  confidentiality_level?: string;
}

export interface MessageHeaderPropsType {
  sender: SenderType;
  formattedDate: string;
  letterhead: boolean;
}

export interface MessageContentPropsType {
  sender: SenderType;
  allposition: PositionType[];
}

export interface MessageFooterPropsType {
  sender: SenderType;
  matchedUsers: MatchedUserType[];
}

export interface MessageAttachmentsPropsType {
  attachments: CorrespondenceAttachmentType[];
}
