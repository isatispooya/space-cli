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
