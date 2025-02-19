export interface MissionTimeFlowType {
  id?: number;
  time_user_start?: string | null;
  time_user_end?: string | null;
  time_parent_start?: string | null;
  time_parent_end?: string | null;
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

export interface MissionTimeFlowResponse {
  own_logs: TimeFlowLog[];
  other_logs: TimeFlowLog[];
}

export interface MissionTimeFlowCreateInput {
  time_user_start: string | null;
  time_user_end: string | null;
}

export interface MissionTimeFlowUpdateInput {
  id: number;
  data: {
    time_user_start: string;
    time_user_end: string | null;
  };
}
