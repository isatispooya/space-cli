interface User {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
}

export interface CorrespondenceAttachment {
  id: number;
  user: User;
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

interface SenderDetails {
  user: User;
}

interface ReceiverInternalDetails {
  user: User;
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
}

export type CorrespondenceAttachments = CorrespondenceAttachment[];
