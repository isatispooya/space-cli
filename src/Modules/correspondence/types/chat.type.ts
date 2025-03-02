import { FormikHelpers } from "formik";

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
}

export interface SingleMessageType {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
  createdAt: number;
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

};

export default ChatType;
