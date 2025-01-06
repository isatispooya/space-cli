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

export interface TimeFlowTypes {
  id: string;
  date: string;
  firstLoginTime?: string;
  ip?: string;
  device?: string;
  browser?: string;
  os?: string;
  intermediate_logs?: Record<string, unknown>;
  last_logout?: string;
}

export interface TimeFlowData {
  login: {
    time: string;
    ip: string;
    device: string;
    browser: string;
    os: string;
  };
  logout?: {
    time: string;
    ip: string;
    device: string;
    browser: string;
    os: string;
  };
  user: {
    full_name: string;
  };
  duration: string;
  intermediate_logs?: Record<string, unknown>;
}

export interface TimeFlowResponse {
  [date: string]: TimeFlowData;
}
