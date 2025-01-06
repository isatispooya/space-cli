interface LoginData {
  first_login: {
    id: string;
    time: string;
    ip: string;
    device: string;
    browser: string;
    os: string;
  };
  intermediate_logs: Record<string, unknown>;
  last_logout: Record<string, unknown>;
  user: {
    firstName: string;
    lastName: string;
    nationalId: string;
  };
}

export interface TimeFlowResponse {
  [date: string]: LoginData;
}

export interface TimeFlowTypes {
  id: string;
  date: string;
  firstLoginTime?: string;
  ip?: string;
  device?: string;
  browser?: string;
  os?: string;
  firstName?: string;
  lastName?: string;
  nationalId?: string;
  intermediate_logs?: Record<string, unknown>;
  last_logout?: Record<string, unknown>;
}
