export * from "./create_company.type";
export * from "./ICreateCompaniesPost.type";

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
  logo?: string;
  letterhead?: string;
  registered_capital?: number;
  registration_number?: string;
  seal?: string;
  signature?: string;
  type_of_activity?: string;
  website?: string;
}
