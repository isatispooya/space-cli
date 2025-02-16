export interface usersTimeflowType {
  id: string;
  date: string;
  firstLoginTime: string;
  ip: string;
  device: string;
  browser: string;
  os: string;
  intermediate_logs: Record<string, unknown>;
  last_logout: string;
  login: {
    time: string;
    ip: string;
    device: string;
    browser: string;
    os: string;
  };
  logout: {
    time: string;
    ip: string;
    device: string;
    browser: string;
    os: string;
  };
  user: {
    full_name: string;
    username: string;
  };
  duration: string;
}
