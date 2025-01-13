export interface PositionData {
  id: number;
  name: string;
  company: number;
  parent: number;
  type_of_employment: number;
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
  company: string;
  user: number;
  parent: string | null;
  type_of_employment: string | null;
  description: string;
  start_date: string;
  end_date: string;

}

export interface PatchPositionParams {
  id: number;
  data: PositionFormValues;
}
