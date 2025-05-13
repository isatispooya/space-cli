export interface RequestType {
  id: number;
  title: string;
  description: string;
  points: number;
  user: {
    first_name: string;
    last_name: string;
  };
  status: "pending" | "approved" | "rejected";
  created_at: string;
  gift_detail: {
    display_name: string;
    point_1: number;
    point_2: number;
    description: string;
  };
  user_detail: {
    first_name: string;
    last_name: string;
    id: number;

  };
  amount: number;
  reason: string;
  account_number?: string;
  
}
