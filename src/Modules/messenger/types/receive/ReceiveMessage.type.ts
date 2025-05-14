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
  sender: CorrespondenceItemType[];
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
  reference: number;
  position_id: string;
  correspondence: number;
  order: string;
}
