export interface ProfileData {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
  profile_image: string | null;
}

export interface SelectedUser {
  id: string;
  name: string;
  avatar?: string;
}

export interface ChatData {
  id: number;
  message: string;
  created_at: string;
  sender: number;
  receiver: number;
  seen: boolean;
  is_deleted: boolean;
  attachment?: string | null;
  attach?: number | null;
  sender_details: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
    profile_image: string | null;
  };
  receiver_details: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
    profile_image: string | null;
  };
  attach_details?: {
    id: number;
    name: string;
    file: string;
    size: number;
    created_at: string;
    updated_at: string;
    user: {
      id: number;
      first_name: string;
      last_name: string;
      uniqueIdentifier: string;
    };
  } | null;
}

export interface AttachmentResponse {
  id: number;
  [key: string]: unknown;
}

export interface MessagingServiceTypes {
  ProfileData: ProfileData;
  SelectedUser: SelectedUser;
  ChatData: ChatData;
  AttachmentResponse: AttachmentResponse;
}

export default MessagingServiceTypes; 