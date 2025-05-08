import { FormikHelpers } from "formik";

export interface attach_details {
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

export interface receiver_details {
  first_name: string;
  id: number;
  last_name: string;
  uniqueIdentifier: string;
  profile_image: string | null;
}
export interface sender_details {
  first_name: string;
  id: number;
  last_name: string;
  uniqueIdentifier: string;
  profile_image: string | null;
}

export interface postAttachmentType {
  attachment: File;
  receiver: number;
  message: string;
}

export interface ChatStateTypes {
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
  receiver_details: receiver_details;
  sender_details: sender_details;
  updated_at: string;
  attachment?: string | null;
  attach_details?: attach_details | null;
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
  senderDetails?: sender_details;
  receiverDetails?: receiver_details;
  attachDetails?: attach_details | null;
}

export interface ChatFormProps {
  onSubmit: (
    values: ChatType["postMessegeType"],
    actions: FormikHelpers<ChatType["postMessegeType"]>
  ) => void;
  loading: boolean;
  selectedUser?: { id: string; name: string; avatar?: string };
  onBackClick?: () => void;
}

export interface postMessegeType {
  content: string;
  receiver: number;
  message: string;
  attach?: number;
}

export interface postSeenType {
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

export interface MessageBubbleProps {
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
    senderDetails?: sender_details;
    receiverDetails?: receiver_details;
    attachDetails?: attach_details | null;
  };
}

export interface ChatInputProps {
  newMessage: string;
  setNewMessage: (value: string) => void;
  handleSendMessage: () => void;
  handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  loading: boolean;
  handleFileUpload: () => void;
  filesCount: number;
}

export interface NewMessagePopupProps {
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

export interface ConversationUsersProps {
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
  receiver_details: receiver_details;
  sender_details: sender_details;
  postMessegeType: postMessegeType;
  UserMessageType: UserMessageType;
  UserPositionType: UserPositionType;
  ConversationUsersProps: ConversationUsersProps;
  SingleMessageType: SingleMessageType;
  ChatFormProps: ChatFormProps;
  ChatStateTypes: ChatStateTypes;
  postSeenType: postSeenType;
  MessageBubbleProps: MessageBubbleProps;
  ChatInputProps: ChatInputProps;
  NewMessagePopupProps: NewMessagePopupProps;
};

export default ChatType;
