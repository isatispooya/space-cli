export interface underwritingTypes {
  id: number;
  amount: number;
  type: string;
  price: number;
  company: number;
  created_at: string;
  document: File | null;
  status: string;
  transaction_id: string;
  updated_at: string;
  redirect_url: string;
  user: number;
}
