export interface companypostTypes {
  [key: string]: unknown;
  id?: number;
  name: string;
  company_type: string;
  year_of_establishment: string;
  phone: string;
  postal_code: string;
  national_id: string;
  description?: string;
  registered_capital?: string;
  registration_number?: string;
  type_of_activity?: string;
  address?: string;
  website?: string;
  email: string;
  employees: number;
}

