import User from "./userLogs.type";

export type OtherLogType = {
  id: number;
  status_parent: string;
  time_parent: string;
  time_user: string;
  user: User;
  type: string;
  isOwnLog: boolean;
};

export default OtherLogType;
