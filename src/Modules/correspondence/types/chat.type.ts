export interface receiver_details {
  first_name: string;
  id: number;
  last_name: string;
  uniqueIdentifier: string;
}

export interface sender_details {
  first_name: string;
  id: number;
  last_name: string;
  uniqueIdentifier: string;
}

export interface ChatType {
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
