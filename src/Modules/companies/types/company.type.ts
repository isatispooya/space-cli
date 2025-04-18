export interface CompanyTypes {
  address: string;
  company_type: string;
  description: string;
  email: string;
  id: number;
  letterhead?: string;
  logo?: string;
  name: string;
  national_id: string | null;
  phone: string | null;
  postal_code: number | null;
  registered_capital: number;
  registration_number: number | null;
  seal?: string;
  signature?: string;
  total_shares?: number;
  type_of_activity: string;
  website: string;
  year_of_establishment: number;
}
