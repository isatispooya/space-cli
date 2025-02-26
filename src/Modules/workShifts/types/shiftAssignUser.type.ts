export interface ShiftAssignUserType {
  company?: number;
  company_detail?: {
    address: string;
    company_type: string;
    description: string;
    email: string;
    id: number;
    letterhead: string;
    logo: string;
    name: string;
    national_id: string;
    phone: string;
    postal_code: string;
    registered_capital: number;
    registration_number: number;
    seal: string;
    signature: string;
    total_shares: number | null;
    type_of_activity: string;
    website: string;
    year_of_establishment: number;
  };

  created_at?: string;
  description?: string;
  end_date?: string;
  id?: number;
  is_default?: boolean;
  name?: string;
  parent?: number;

  shift_detail?: {
    created_at: string;
    id: number;
    name: string;
    owner: number;
    updated_at: string;
  };
  start_date?: string;
  type_of_employment?: string;
  user: {
    first_name: string;
    id: number;
    last_name: string;
    uniqueIdentifier: string;
  };
}
