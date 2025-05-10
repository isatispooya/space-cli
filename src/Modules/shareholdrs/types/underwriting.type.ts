import { PaymentDetailType } from "./paymentDetail";
export interface UnderwritingType {
  id: number;
  type: string;
  price: number;
  amount?: number;
  company?: number;
  created_at: string;
  document?: File | null;
  status: string;
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
  requested_amount: number;
  user_detail?: {
    first_name: string;
    last_name: string;
    id: number;
    uniqueIdentifier: string;
  };
  payment_detail?: PaymentDetailType;
  type_peyment?: string;
}
