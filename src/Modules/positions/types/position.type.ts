interface CompanyDetail {
  id: number;
  name: string;
}

export interface PositionData {
  id: number;
  name: string;
  company: number;
  company_detail: CompanyDetail;
  parent: {
    id: number;
    name: string;
  } | null;
  type_of_employment: string;
  description: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier?: string;
  };
  created_at: string;
  start_date: string;
  end_date: string;
}

export interface PositionFormValues {
  name: string;
  company: string;
  user: string;
  parent: string | null;
  type_of_employment: string | null;
  description: string;
  start_date: string;
  end_date: string;
} 