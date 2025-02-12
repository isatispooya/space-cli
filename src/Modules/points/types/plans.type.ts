export interface PlansType {
  appendices: [];
  board_members: [
    {
      company_name: string;
      company_national_id: string | null;
      first_name: string;
      is_agent_from_company: boolean;
      last_name: string;
      organization_post_description: string;
      organization_post_id: number;
      plan: number;
    }
  ];
  company: [
    {
      address: string;
      company_type_description: string;
      compnay_type_id: number;
      economic_id: string;
      email_address: string;
      fax_number: string;
      id: number;
      name: string;
      national_id: number;
      phone_number: string;
      plan: number;
      postal_code: string;
      registration_date: string;
      registration_number: string;
    }
  ];
  information_complete: [
    {
      amount_collected_now: number | null;
      id: number;
      payback_period: string;
      payment_date: string | null;
      period_length: number;
      plan: number;
      rate_of_return: number | null;
      status_second: string | null;
      status_show: boolean;
      viedo: string | null;
    }
  ];
  picture_plan: [
    {
      picture: string | null;
      plan: number | null;
    }
  ];
  plan: {
    approved_underwriting_end_date: string;
    approved_underwriting_start_date: string;
    company_unit_counts: number;
    creation_date: string;
    crowd_funding_type_description: string;
    crowd_funding_type_id: number;
    english_approved_symbol: string | null;
    english_name: string;
    english_subject: string | null;
    english_suggested_symbol: string;
    float_crowd_funding_type_description: string;
    id: number;
    industry_group_description: string;
    industry_group_id: number;
    legal_person_maximum_availabe_price: number | null;
    legal_person_minimum_availabe_price: number;
    minimum_required_price: number;
    number_of_finance_provider: number;
    persian_approved_underwriting_end_date: string;
    persian_approved_underwriting_start_date: string;
    persian_creation_date: string;
    persian_name: string;
    persian_project_end_date: string;
    persian_project_start_date: string;
    persian_subject: string;
    persian_suggested_symbol: string;
    persian_suggested_underwiring_start_date: string;
    persian_suggested_underwriting_end_date: string;
    persoan_approved_symbol: string | null;
    project_end_date: string;
    project_start_date: string;
    project_status_description: string;
    project_status_id: number;
    real_person_maximum_available_price: number;
    real_person_minimum_availabe_price: number;
    settlement_description: string;
    sub_industry_group_description: string;
    sub_industry_group_id: number;
    suggested_underwriting_end_date: string;
    suggested_underwriting_start_date: string;
    sum_of_funding_provided: number;
    total_price: number;
    total_units: number;
    trace_code: string;
    underwriting_duration: number;
    unit_price: number;
  };
  shareholder: [
    {
      first_name: string;
      last_name: string;
      plan: number;
      share_percent: number;
      shareholder_type: number;
    }
  ];
}
