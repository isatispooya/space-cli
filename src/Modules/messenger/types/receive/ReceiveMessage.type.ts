export interface ReceiveMessage {
  id: number;
  title: string;
  receiver: string;
  sender: string;
  send_date: string;
  status: string;
  message_type: string;
}

export interface CorrespondenceReceiver {
  receiver: CorrespondenceItem[];
}

export interface CorrespondenceItem {
  id: number;
  subject: string;
  created_at: string;
  priority: string;
  is_internal: boolean;
  sender_details?: {
    user?: {
      first_name: string;
      last_name: string;
    };
  };
  receiver_internal_details?: {
    user?: {
      first_name: string;
      last_name: string;
    };
  };
  receiver_external?: string;
}

export interface CellComponent {
  getElement: () => HTMLElement;
  getRow: () => { getData: () => ReceiveMessage };
} 