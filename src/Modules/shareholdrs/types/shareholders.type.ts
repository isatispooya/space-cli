export interface ShareholdersTypes {
  id?: number;
  name?: string;
  number_of_shares?: number;
  updated_at?: string;
  created_at?: string;
  company: number;
  user?: number;
  company_detail?: {
    name: string;
    company_type: string;
  };
  user_detail?: {
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
}

export type CreateShareholderDTO = Omit<ShareholdersTypes, "id">;
