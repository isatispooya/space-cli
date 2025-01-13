export interface CompanyData {
  id: number;
  name: string;
  address: string;
  employees: number;
  email: string;
  company_type: string;
  year_of_establishment: number;
  phone: string;
  postal_code: string;
  national_id: string;
  description?: string;
  letterhead?: string;
  registered_capital?: number;
  registration_number?: number;
  type_of_activity?: string;
  website?: string;
  file?: File;
 
}
