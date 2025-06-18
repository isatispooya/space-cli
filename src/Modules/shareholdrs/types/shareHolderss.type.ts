export interface ShareHoldersNewType {
  id: number;
  company_detail: {
    name: string;
    company_type: string;
    id: number;
  };
  user_detail: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
    mobile: string;
    father_name: string;
  };
  number_of_shares: number;
  underwriting: number;
  precedence_count: number;
  father_name: string;
  used_precedence: number;
  precedence: string;
  
}

export default ShareHoldersNewType;
