export interface User {
  id: number;
  first_name: string;
  last_name: string;
}

export interface PositionFormTypes {
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

export interface PositionTypes {
  id: number;
  name: string;
  company: number;
  parent: {
    id: number;
    name: string;
  } | null;
  type_of_employment: string | null;
  description: string;
  user: User;
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
