export interface CompanyType {
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
  title: string;
  persian_registration_date: string;
  tel: string;
  capital: number;
  registration_type_title: string;
  registration_unit: string;
  general_directorate: string;
}

export interface CompanyResponseType {
  company: {
    id: number;
  }
}

export type CompanyListType = CompanyType[];
