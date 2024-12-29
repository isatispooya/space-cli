export interface PurchacePrecendenceCreate {
    amount: number;
    price: number;
    total_price: number;
    process: number;
    transaction_id: string;
  
    status: string;
  }