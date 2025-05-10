interface UserType {
  email: string | null;
  first_name: string;
  id: number;
  last_name: string;
  username: string;
}

interface OwnLogsType {
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
  user: UserType;
  user_agent: string;
}

interface OtherLogsType {
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
  user: UserType;
  user_agent: string;
}

interface AbsenceType {
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

interface UserDetailType {
  id: number;
  first_name: string;
  last_name: string;
  uniqueIdentifier: string;
  mobile: string;
  profile_image: string;
}

interface UserLoginType {
  other_logs: OtherLogsType[];
  own_logs: OwnLogsType[];
  own_absence: AbsenceType[];
  user_detail: UserDetailType;
}

export default UserLoginType;
