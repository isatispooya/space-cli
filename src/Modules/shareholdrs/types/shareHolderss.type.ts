export interface ShareHoldersNewType {
  id: number;
  company_detail: {
    name: string;
    company_type: string;
  };
  user_detail: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
    mobile: string;
  };
  number_of_shares: number;
  precedence_count: number;
  used_precedence: number;
  precedence: string;

}

export default ShareHoldersNewType;
