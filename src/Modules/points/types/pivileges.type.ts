export interface PrivilegesType {
  point_1: number;
  point_2: number;
  type: string;
  description: string;
  id: number;
  user_first_name: string;
  user_last_name: string;
  user_phone: string;
  user_detail: {
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
  by_user_detail: {
    first_name: string;
    last_name: string;
  };
}