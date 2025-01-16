


export interface PaymentDetail {
  id: number;
  cart_number: string|null;
  error: string|null;
  created_at: string;
  updated_at: string;
  code_payment: string|null;
  code_state_payment: string|null;
  error_code: string|null;
  hashed_cart_number: string|null;
  invoice_unique_id: string|null;
  payment_gateway?: number;
  payment_url: string|null;
  referal_number?: string;
  refrence_number?: string;
  state_description: string|null;
  status: string;
  track_id?: string;
  transaction_url?: string;
  verify_transaction?: boolean;
  type?: string;
  
}
