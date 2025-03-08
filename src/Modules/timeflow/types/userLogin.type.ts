interface User {
  email: string | null;
  first_name: string;
  id: number;
  last_name: string;
  username: string;
}

interface Own_logs {
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
  user: User;
  user_agent: string;
}

interface Other_logs {
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
  user: User;
  user_agent: string;
}

interface Absence {
  date: string;
  time_end: string;
  time_start: string;
  type: string;
  status_parent?: string;
  status_self?: string;
  user_detail: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
  first_name: string;
  id: number;
  last_name: string;
  uniqueIdentifier: string;
  user_id: number;
  working_day: boolean;
}

interface UserDetail {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
  mobile: string;
  profile_image: string;
}



interface UserLoginType {
  other_logs: Other_logs[];
  own_logs: Own_logs[];
  own_absence: Absence[];
  user_detail: UserDetail;
}

export default UserLoginType;
