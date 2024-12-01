export interface CompanyData {
  id: number;
  name: string;
  company_type: string;
  year_of_establishment: number;
  phone: string;
  postal_code: string;
  national_id: string;
  description?: string;
  logo?: string;
  letterhead?: string;
  registered_capital?: number;
  registration_number?: string;
  seal?: string;
  signature?: string;
  type_of_activity?: string;
  website?: string;
}
