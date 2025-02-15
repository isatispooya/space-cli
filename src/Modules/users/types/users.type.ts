export interface UsersTypes {
  accounts: {
    account_number: string;
    bank: string;
    branch_code: string;
    branch_name: string;
    id: number;
    is_default: boolean;
    sheba_number: string;
    type: string;
    user: number;
  }[];
  sheba_number: string;
  type: string;
  branch_name: string;
  branch_code: string;
  bank: string;
  account_number: string;
  age: number | null;
  birth_date: string | null;
  email: string | null;
  first_name: string;
  gender: string;
  id: number;
  last_name: string;
  legal_person: string | null;
  mobile: string | null;
  place_of_birth: string | null;
  points: {
    point_1: number | 0;
    point_2: number | 0;
  };
  refrence_number: string | null;
  uniqueIdentifier: string | null;
}
