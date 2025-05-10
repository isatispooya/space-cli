export interface UserInfoType {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
}

export interface TimeflowEventType {
  userUsername: string;
  userName: string;
  id: number;
  browser: string;
  device_type: string;
  ip_address: string;
  os_type: string;
  status_parent: "pending" | "approved" | "rejected";
  status_self: "pending" | "approved" | "rejected";
  time_device: string; // ISO 8601 timestamp with timezone
  time_parent: string; // ISO 8601 timestamp with timezone
  time_system: string; // ISO 8601 timestamp with timezone
  time_user: string; // ISO 8601 timestamp with timezone
  type: "login" | string; // Can be expanded with other event types
  user: UserInfoType;
  user_agent: string;
}

export default TimeflowEventType;
