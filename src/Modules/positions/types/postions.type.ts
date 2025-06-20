export interface UserType {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
}

export interface PositionFormType {
  id: number;
  name: string;
  company: number;
  parent: number | null;
  type_of_employment: string | null;
  description: string;
  user: number;
  start_date: string;
  end_date: string;
  created_at?: string;
  sender: string;
  first_name: string;
  last_name: string;
  company_detail?: {
    id: number | string;
    name: string;
  };
}

export interface PositionType {
  id: number;
  name: string;
  company: number;
  parent: {
    id: number;
    name: string;
  } | null;
  type_of_employment: string | null;
  description: string;
  user: UserType;
  start_date: string;
  executive_position: boolean;
  end_date: string;
  created_at?: string;
  sender: string;
  first_name: string;
  last_name: string;
  signature?: string;
  seal?: string;
  company_detail?: {
    id: number | string;
    name: string;
  };
  signature_holder?: boolean;
}
