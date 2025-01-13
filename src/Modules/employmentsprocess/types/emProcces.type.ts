export interface EmProcessTypes {
  created_at: string;
  end_date: string;
  id: number;
  job_description: string;
  job_location: string;
  job_title: string;
  position: string;
  reason_for_termination_of_cooperation: string;
  salary: number;
  start_date: string;
  updated_at: string;
  user: number;
  user_detail: {
    first_name: string;
    id: number;
    last_name: string;
    uniqueIdentifier: string;
  };
}
