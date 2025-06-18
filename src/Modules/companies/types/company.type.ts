export interface ResType {
  about: string;
  address: string;
  codal_link: string | null;
  company_type: string;
  description: string;
  email: string;
  enamad_script: string;
  facebook_link: string | null;
  farabourse_script: string;
  hero_type: string;
  id: number;
  instagram_link: string | null;
  letterhead: string;
  linkedin_link: string | null;
  logo: string | null;
  logo_type: string | null;
  logo_type_white: null;
  logo_white: string | null;
  map_link: string;
  name: string;
  national_id: string | "" | null;
  phone: string | "" | null;
  postal_code: string | "" | null;
  registered_capital: number | null;
  registration_number: number | null;
  seal: string | "" | null;
  signature: string | "" | null;
  telegram_link: null;
  total_shares: number | null;
  twitter_link: null;
  type_of_activity: string | null;
  video_site: null;
  website: string | null;
  whatsapp_link: string | null;
  year_of_establishment: number | null;
  youtube_link: string | null;
}

export interface CompanyResponseType {
  company: {
    id: number;
  };
}

export interface CompanyMemberType {
  id: number;
  uniqueIdentifier: string;
  position_id: number;
  start_date: string;
  end_date: string;
  person_title: string;
  position_title: string;
  picture_url: string | null;
  duration?: string;
  first_role?: string;
  company_type?: string;
  second_role?: string;
  agent: boolean;
  birth_certificate: string | null;
  by_news_id: number;
  gender: string | null;
  national_cart: string | null;
  phone_number: string | null;
  previous_article: string | null;
  signature: boolean;
  signature_document: string | null;
  tagline: string | null;
  validation_report: string | null;
}

export type CompanyType = {
  getCompanyRes: ResType[];
  id: number;
  name: string;
  national_id?: string;
  title?: string;
  company_type?: string;
  address?: string;
  postal_code?: string;
  persian_registration_date?: string;
  tel?: string;
  email?: string;
  website?: string;
  capital?: number;
  registration_number?: string;

  registration_type_title?: string;
  registration_unit?: string;
  general_directorate?: string;
  company_members?: CompanyMemberType[];
  economic_code?: string;
  lat?: number;
  lng?: number;
  picture?: string;
  registration_date?: string;
  registration_type?: string;
  registration_type_id?: string;
  status?: string;
};
