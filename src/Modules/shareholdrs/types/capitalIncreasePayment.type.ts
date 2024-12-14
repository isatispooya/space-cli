export interface CapitalIncreaseTypes {
  id: number;
  company: number;
  position: number;
  number_of_shares: number;
  price: number;
  created_at: string;
  updated_at: string;
}

export type CreateCapitalIncreaseDTO = Omit<CapitalIncreaseTypes, 'id'>;
