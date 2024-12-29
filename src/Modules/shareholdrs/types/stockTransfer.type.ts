export interface stockTransferTypes {
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
  stockTransferTypes,
  "id" | "document"
>;