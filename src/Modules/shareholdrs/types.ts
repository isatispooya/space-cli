import { CompanyData } from "../companies/types";
import { UserLiteData } from "../users/types/userData.type";
export interface ShareholdersTypes {
  id: number;
  number_of_shares: number;
  company: number;
  company_name?: string;
  company_type?: string;
  first_name?: string;
  last_name?: string;
  uniqueIdentifier?: string;
  company_detail?: CompanyData;
  user_detail?: UserLiteData;
  user: number;
  user_name?: string;
  updated_at?: string;
  created_at?: string;
} 


