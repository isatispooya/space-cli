export interface StockTransferType {
  id: number;
  buyer: number;
  seller: number;
  number_of_shares: number;
  price: number;
  document: string | null;
  company: number;
  user: number;
}

export type CreateStockTransferType = Omit<
  StockTransferType,
  "id" | "document"
>;
