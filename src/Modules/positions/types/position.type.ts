interface CompanyDetail {
  id: number;
  name: string;
}

export interface PositionData {
  id: number;
  name: string;
  company: number;
  company_detail: CompanyDetail;
  parent: number;
  type_of_employment: string;
  description: string;
  user: {
    first_name: string;
    last_name: string;
  }[];
  created_at: string;
  start_date: string;
  end_date: string;
} 