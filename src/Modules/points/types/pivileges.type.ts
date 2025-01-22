export interface PrivilegesTypes {
  amount: number;
  created_at: string;
  description: string;
  id: number;
  mission: number;
  updated_at: string;
  user: number;
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
