import { MatchedUserType, SenderType, PositionType } from "./sent.type";

export interface PublishedMessagePropsType {
  onNavigateBack: () => void;
}

export interface SentMessageType {
  id: number;
  title: string;
  receiver: string;
  sender: string;
  send_date: string;
  status: string;
  message_type: string;
}

export interface MessageHeaderPropsType {
  sender: SenderType;
  formattedDate: string;
}

export interface MessageContentPropsType {
  sender: SenderType;
  signature?: PositionType[];
  allposition?: PositionType[];
  seal?: string;
}

export interface MessageFooterPropsType {
  sender: SenderType;
  matchedUsers?: MatchedUserType[];
}
