export interface ReceiveMessageType {
  id: number;
  title: string;
  receiver: string;
  sender: string;
  send_date: string;
  read_at: string;
  status: string;
  message_type: string;
}

export interface CorrespondenceReceiverType {
  receiver: CorrespondenceItemType[];
  sender: CorrespondenceItemType[];
}

export interface CorrespondenceItemType {
  id: number;
  subject: string;
  created_at: string;
  read_at: string;
  priority: string;
  is_internal: boolean;
  number: string;
  seen?: boolean;
  published?: boolean;
  confidentiality_level?: string;
  sender_details?: {
    id?: number;
    user?: {
      first_name: string;
      last_name: string;
    };
    name?: string;
    confidentiality_level?: string;
  };
  receiver_internal_details?: {
    id?: number;
    user?: {
      first_name: string;
      last_name: string;
    };
    name?: string;
    confidentiality_level?: string;
  };
  receiver_external?: string;
  receiver_external_details?: {
    name?: string;
  };
}

export interface ReferralReqType {
  from_reference: number;
  instruction_text: string;
  reference: number | null;
  status_reference: string;
  workflow: number;
  sender_details?: {
    id: number;
    user?: {
      id: number;
      first_name: string;
      last_name: string;
    };
  };
}
