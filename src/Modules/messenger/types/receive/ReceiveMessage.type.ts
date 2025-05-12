export interface ReceiveMessageType {
  id: number;
  title: string;
  receiver: string;
  sender: string;
  send_date: string;
  status: string;
  message_type: string;
}

export interface CorrespondenceReceiverType {
  receiver: CorrespondenceItemType[];
}

export interface CorrespondenceItemType {
  id: number;
  subject: string;
  created_at: string;
  priority: string;
  is_internal: boolean;
  number: string;
  seen?: boolean;
  confidentiality_level?: string;
  sender_details?: {
    user?: {
      first_name: string;
      last_name: string;
    };
    name?: string;
    confidentiality_level?: string;
  };
  receiver_internal_details?: {
    user?: {
      first_name: string;
      last_name: string;
    };
    name?: string;
    confidentiality_level?: string;
  };
  receiver_external?: string;
}

