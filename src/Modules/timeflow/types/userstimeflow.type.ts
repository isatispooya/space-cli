export interface UsersTimeflowType {
  id: number;
  time_user: string;
  date: {
    status_parent : string,
     time_parent: string
  };
  time_end: string;
  time_start: string;
  status_self: string;
  status_parent: string;
  type: string;
  os_type: string;
  browser: string;
  user_id: number;
  ip_address: string;
  device_type: string;

  user: {
    username: string;
  };
  time_parent: string;
  user_detail: {
    id: number;
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
}


export interface TimeflowVerifyReqType {
  status_parent: string;
  time_parent: string;
}

export default UsersTimeflowType;
