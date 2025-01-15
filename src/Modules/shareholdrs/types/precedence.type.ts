export interface PrecedenceTypes {
  id: number;
  company: number;
  company_detail?: {
    id: number;
    name: string;
  };
  user: number;
  user_detail?: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
  precedence: number;
  used_precedence: number;
  updated_at: string;
}
