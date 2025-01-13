export interface EmploymentsTypes {
  created_at: string;
  eligibility_criteria: string;
  experience: string;
  expiration_date: string;
  gender: string;
  id: number;
  is_active: boolean;
  job_description: string;
  job_location: string;
  job_title: string;
  kind_of_job: string;
  picture: null;
  updated_at: string;
  user: number;
  company:
    | number
    | {
        address: string;
        company_type: string;
        description: string;
        email: string;
        id: number;
        letterhead: null;
        logo: string;
        name: string;
        national_id: string;
        phone: string;
        postal_code: string;
        registered_capital: number;
        registration_number: number;
        seal: null;
        signature: null;
        total_shares: number;
        type_of_activity: string;
        website: string;
        year_of_establishment: number;
      };
}

export interface EmploymentsPostTypes extends FormData {
  job_title: string;
  job_location: string;
  // ... other fields
}
