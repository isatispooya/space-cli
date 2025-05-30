export interface ShareholdersType {
  company?: string;
  company_national_id?: string;
  number_of_shares?: number;
  underwriting?: number;
  first_name?: string;
  last_name?: string;
  precedence_count?: number;
  uniqueIdentifier?: string;
  mobile?: string;
  capital_increase_payment?: number | [];
  precedence_used?: number;
  used_precedence?:number;
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
    mobile?: string;
  };
}

export type CreateShareholderType = Omit<ShareholdersType, "id">;
