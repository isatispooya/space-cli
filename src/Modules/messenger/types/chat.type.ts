import { FormikHelpers } from "formik";

export interface AttachDetailsType {
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
}

export interface ReceiverDetailsType {
  first_name: string;
  id: number;
  last_name: string;
  uniqueIdentifier: string;
  profile_image: string | null;
}
export interface SenderDetailsType {
  first_name: string;
  id: number;
  last_name: string;
  uniqueIdentifier: string;
  profile_image: string | null;
}

export interface PostAttachmentType {
  attachment: File;
  receiver: number;
  message: string;
}

export interface ChatStateType {
  selectedUserId: string | null;
  showAllUsers: boolean;
  searchQuery: string;
  searchPositionQuery: string;
  users: ChatType["UserMessageType"][];
  positionUsers: ChatType["UserPositionType"][];
}
export interface MessagesType {
  attach: File | null;
  created_at: string;
  id: number;
  is_deleted: boolean;
  message: string;
  receiver: number;
  seen: boolean;
  sender: number;
  receiver_details: ReceiverDetailsType;
  sender_details: SenderDetailsType;
  updated_at: string;
  attachment?: string | null;
  attach_details?: AttachDetailsType | null;
}

export interface SingleMessageType {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
  createdAt: number;
  attachment?: string | null;
  attachmentType?: string | null;
  attachmentName?: string | null;
  attachmentSize?: number | null;
  read?: boolean;
  seen?: boolean;
  isDeleted?: boolean;
  senderId?: number;
  receiverId?: number;
  attachId?: number | null;
  senderDetails?: SenderDetailsType;
  receiverDetails?: ReceiverDetailsType;
  attachDetails?: AttachDetailsType | null;
  sender_avatar?: string | null;
  sender_profile_image?: string | null;
}

export interface ChatFormPropsType {
  onSubmit: (
    values: ChatType["postMessegeType"],
    actions: FormikHelpers<ChatType["postMessegeType"]>
  ) => void;
  loading: boolean;
  selectedUser?: { id: string; name: string; avatar?: string; profile_image?: string };
  onBackClick?: () => void;
}

export interface PostMessegeType {
  content: string;
  receiver: number;
  message: string;
  attach?: number;
}

export interface PostSeenType {
  seen: boolean;
  sender_id: number;
}

export interface UserMessageType {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageTime: string;
  isOnline: boolean;
  avatar: string | null;
  uniqueIdentifier: string;
  profile_image: string | null;
}

export interface MessageBubblePropsType {
  message: {
    isCurrentUser: boolean;
    sender: string;
    text: string;
    timestamp: string;
    attachment?: string | null;
    attachmentType?: string | null;
    attachmentName?: string | null;
    attachmentSize?: number | null;
    read?: boolean;
    seen?: boolean;
    isDeleted?: boolean;
    senderId?: number;
    receiverId?: number;
    attachId?: number | null;
    senderDetails?: SenderDetailsType;
    receiverDetails?: ReceiverDetailsType;
    attachDetails?: AttachDetailsType | null;
    sender_avatar?: string | null;
    sender_profile_image?: string | null;
  };
}

export interface ChatInputPropsType {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  loading: boolean;
  handleFileUpload: () => void;
  filesCount: number;
}

export interface NewMessagePopupPropsType {
  onSelectUser: (user: { id: string; name: string; avatar?: string }) => void;
  showAllUsers: boolean;
  setShowAllUsers: (show: boolean) => void;
  searchPositionQuery: string;
  setSearchPositionQuery: (query: string) => void;
  handlePositionUserClick: (user: ChatType["UserPositionType"]) => void;
}

export interface UserPositionType {
  id: string;
  name?: string;
  user: {
    id: string;
    name: string;
    avatar: string | null;
    profile_image: string | null;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
}

export interface ConversationUsersPropsType {
  onSelectUser: (user: {
    id: string;
    name: string;
    avatar?: string;
    profile_image?: string;
  }) => void;
  selectedUserId?: string | null;
}

export type ChatType = {
  MessagesType: MessagesType;
  receiver_details: ReceiverDetailsType;
  sender_details: SenderDetailsType;
  postMessegeType: PostMessegeType;
  UserMessageType: UserMessageType;
  UserPositionType: UserPositionType;
  ConversationUsersProps: ConversationUsersPropsType;
  SingleMessageType: SingleMessageType;
  ChatFormProps: ChatFormPropsType;
  ChatStateTypes: ChatStateType;
  postSeenType: PostSeenType;
  MessageBubbleProps: MessageBubblePropsType;
  ChatInputProps: ChatInputPropsType;
  NewMessagePopupProps: NewMessagePopupPropsType;
};

export default ChatType;
