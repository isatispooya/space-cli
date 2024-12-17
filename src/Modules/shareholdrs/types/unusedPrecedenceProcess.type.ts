export interface unusedPrecedenceProcessTypes {
  id: number;
  company: string;
  price: number;
  amount: number;
  process: number;
  transaction_id: string;
  status: string;
  document: string | File;
  type: string;
}

export interface PurchacePrecendenceCreate {
  amount: number;
  price: number;
  total_price: number;
  process: number;
  transaction_id: string;

  status: string;
}
