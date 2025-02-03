export interface InsuranceRequest {
  id: number;
  insurance_name_detail: string;
  user_detail: string;
  price: number;
  insurance_status: string;
  button: string;
  text: string;
}

export interface StatusTranslation {
  text: string;
  button?: string;
  url?: string;
}

