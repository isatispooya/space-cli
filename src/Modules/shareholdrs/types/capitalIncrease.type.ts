export interface CapitalIncreaseCreate {
  company: string;
  number_of_shares: string;
  price: string;
  user: string;
}

export interface CapitalIncreaseTypes extends CapitalIncreaseCreate {
  id: number;
  position: string;
  created_at: string;
  updated_at: string;
} 