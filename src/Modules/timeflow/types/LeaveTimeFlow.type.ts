export interface LeaveTimeFlowType {
  id?: number;
  time_user_start: string | null;
  time_user_end: string | null;
  mission_detail?: {
    point_1: number;
    point_2: number;
    display_name: string;
  };
  user_detail?: {
    first_name: string;
    last_name: string;
    mobile: string;
  };
  amount?: number;
  description?: string;
  created_at?: string;
  status_parent?: "pending" | "approved";
  mission?: string;
}

interface User {
  first_name: string;
  last_name: string;
}

interface TimeFlowLog {
  id: number;
  time_user: string;
  status_parent: "pending" | "approved";
  user: User;
}

export interface LeaveTimeFlowResponse {
  own_logs: TimeFlowLog[];
  other_logs: TimeFlowLog[];
}

export interface LeaveTimeFlowCreateInput {
  time_user_start: string | null;
  time_user_end: string | null;
  time_parent_start?: string | null;
  time_parent_end?: string | null;
}

export interface LeaveTimeFlowUpdateInput {
  id: number;
  data: {
    time_user_start: string;
    time_user_end: string | null;
  };
}
