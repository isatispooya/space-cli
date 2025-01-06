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
  user_detail?: {
    first_name: string;
    last_name: string;
    id: number;
  };
}

