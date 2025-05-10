export interface ProfileDataType {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
  profile_image: string | null;
}

export interface SelectedUserType {
  id: string;
  name: string;
  avatar?: string;
}

export interface ChatDataType {
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

export interface AttachmentResponseType {
  id: number;
  [key: string]: unknown;
}

export interface MessagingServiceType {
  ProfileData: ProfileDataType;
  SelectedUser: SelectedUserType;
  ChatData: ChatDataType;
  AttachmentResponse: AttachmentResponseType;
}

export default MessagingServiceType; 