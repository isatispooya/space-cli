export interface PositionData {
  id: number;
  name: string;
  company: number;
  parent: {
    id: number;
    name: string;
  } | null;
  type_of_employment: string;
  description: string;
  user: {
    first_name: string;
    last_name: string;
    id: number;
  };
  start_date: string;
  end_date: string;
  created_at: string;
  sender: string;
  first_name: string;
  last_name: string;
  company_detail?: {
    id: number | string;
    name: string;
  };
}

export interface PositionFormValues {
  name: string;
  company: string | number;
  user: string | number;
  parent: string | number | null;
  type_of_employment: string | null;
  description: string;
  start_date?: string;
  end_date?: string;
}

export interface PatchPositionParams {
  id: number;
  data: PositionFormValues;
}
