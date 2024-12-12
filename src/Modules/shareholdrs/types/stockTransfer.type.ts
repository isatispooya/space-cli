export interface StockTransferTypes {
  id: number;
  buyer: number;
  seller: number;
  number_of_shares: number;
  price: number;
  created_at: string;
  updated_at: string;
  document: string | null;
}
