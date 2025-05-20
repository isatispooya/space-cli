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

export type CompanyType = {
  getCompanyRes: ResType[];
  id: number;
  name: string;
  national_id?: string;
  title?: string;
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
};
