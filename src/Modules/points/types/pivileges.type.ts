export interface PrivilegesTypes {
  point_1: number;
  point_2: number;
  created_at: string;
  amount: number;
  description: string;
  id: number;
  mission: string;
  user_first_name: string;
  user_last_name: string;
  user_phone: string;
  user_detail: {
    first_name: string;
    last_name: string;
    mobile: string;
  };
  mission_detail: {
    display_name: string;
    point_1: number;
    point_2: number;
  };
}