export interface ShareholdersTypes {
  company?: string;
  company_national_id?: string;
  number_of_shares?: number;
  first_name?: string;
  last_name?: string;
  precedence_count?: number;
  uniqueIdentifier?: string;
  capital_increase_payment?: number | [];
  precedence?: number;
  updated_at?: string;
  created_at?: string;
  id?: number;
  name?: string;
  user?: number;
  company_detail?: {
    name?: string;
    company_type?: string;
  };
  user_detail?: {
    first_name?: string;
    last_name?: string;
    uniqueIdentifier?: string;
  };
}

export type CreateShareholderDTO = Omit<ShareholdersTypes, "id">;
