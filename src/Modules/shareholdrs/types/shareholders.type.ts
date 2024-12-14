export interface ShareholdersTypes {
  id: number;
  name: string;
  number_of_shares: number;
  updated_at: string;
  created_at: string;
  company: string;
}

export type CreateShareholderDTO = Omit<ShareholdersTypes, 'id'>;

export interface StockTransferTypes {
  id: number;
  buyer: number;
  seller: number;
  number_of_shares: number;
  price: number;
  document: string | null;
  updated_at: string;
  created_at: string;
}

export type CreateStockTransferDTO = Omit<StockTransferTypes, 'id' | 'document'>;
