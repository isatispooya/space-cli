export interface purchacePrecendenceTypes {
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
  user: number;
}

export interface PurchacePrecendenceCreate {
  amount: number;
  price?: number;
  total_price?: number;
  type?: string;
  process: number;
  transaction_id?: string;
  status?: string;
}
