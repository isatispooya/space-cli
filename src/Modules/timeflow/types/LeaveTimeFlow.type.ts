export interface LeaveTimeFlowType {
  id: number;
  time_user_start: string | null;
  time_user_end: string | null;
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
}

export interface LeaveTimeFlowUpdateInput {
  id: number;
  data: {
    time_user_start: string;
    time_user_end: string | null;
  };
}
