export interface ShareholdersTypes {
  id: number;
  name?: string;
  number_of_shares: number;
  updated_at?: string;
  created_at?: string;
  company: number;
  user: number;
}

export type CreateShareholderDTO = Omit<ShareholdersTypes, "id">;

export interface StockTransferTypes {
  id: number;
  buyer: number;
  seller: number;
  number_of_shares: number;
  price: number;
  document: string | null;
  company: number;
  user: number;
}

export type CreateStockTransferDTO = Omit<
  StockTransferTypes,
  "id" | "document"
>;
