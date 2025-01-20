import { PaymentDetail } from "./paymentDetail";
export interface underwritingTypes {
  id?: number;
  amount?: number;
  type?: string;
  price?: number;
  company?: number;
  created_at?: string;
  document?: File | null;
  status?: string;
  transaction_id?: string;
  updated_at?: string;
  redirect_url?: string;
  total_price?: number;
  user?: string;
  process?: number;
  description?: string;
  agreement_text?: string;
  document_type?: string;
  first_name?: string;
  last_name?: string;
  user_detail?: {
    first_name: string;
    last_name: string;
    id: number;
  };
  payment_detail?: PaymentDetail;
  type_peyment?: string;
  requested_amount?: number;
}

export interface UnderwritingTypes {
  id: number;
  type: string;
  price: number;
  requested_amount: number;
  status: string;
  created_at: string;
  payment_detail?: {
    track_id: string;
  };
  user_detail?: {
    first_name: string;
    last_name: string;
  };
}

