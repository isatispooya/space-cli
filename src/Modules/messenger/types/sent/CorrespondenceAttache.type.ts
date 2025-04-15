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

export interface AttachmentResponse {
  id: number;
  name: string;
  file: string;
  size: number;
}

export type CorrespondenceAttachments = CorrespondenceAttachment[];

