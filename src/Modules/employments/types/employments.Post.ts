export interface EmploymentsPostType {
  job_title: string;
  job_location: string;
  job_description: string;
  eligibility_criteria: string;
  experience: string;
  kind_of_job: string;
  company: string;
  gender: string;
  expiration_date: string;
  is_active: boolean;
  picture: File | null;
}
