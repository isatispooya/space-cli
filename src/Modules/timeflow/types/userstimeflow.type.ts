export interface UsersTimeflowType {
  date: string;
  time_end: string;
  time_start: string;
  type: string;
  user_id: number;
  user_detail: {
    first_name: string;
    last_name: string;
    uniqueIdentifier: string;
  };
}

export default UsersTimeflowType;
