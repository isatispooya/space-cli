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

export type FormDataType = {
  subject: string;
  text: string;
  description: string;
  attachments: number[];
  receiver: number[];
  sender: number[];
  receiver_internal: number;
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
  authority_correspondence: number;
  reference: number[];
  published: boolean;
};

export interface AttachmentResponse {
  id: number;
  name: string;
  file: string;
  size: number;
}

export type CorrespondenceAttachments = CorrespondenceAttachment[];
