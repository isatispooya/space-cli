export interface UserTimeFlowType {
  browser: string | null;
  device_type: string;
  id: number;
  ip_address: string;
  os_type: string;
  status_parent: string;
  status_self: string;
  time_device: string;
  time_parent: string;
  time_system: string;
  time_user: string;
  type: string;
  user: {
    email: string | null;
    first_name: string;
    id: number;
    last_name: string;
    username: string;
  };
  user_agent: string;
}
