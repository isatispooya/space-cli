export interface InsuranceRequest {
  id: number;
  insurance_name: string | number;
  insurance_name_detail: {
    field_detail: Array<{
      id: number;
      name: string;
    }>;
  };
  description_detail?: Array<{
    description_user: string;
  }>;
  file_detail?: Array<{
    file_name: number;
    file_attachment: string;
  }>;
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
  status?: string;
}

export interface InsuranceCompany {
  id: number;
  name: string;
}

export interface InsuranceField {
  id: number;
  name: string;
}



