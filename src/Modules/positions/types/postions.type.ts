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


