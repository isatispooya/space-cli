import User from "./userLogs.type";

export type OwnLogType = {
  id: number;
  status_self: string;
  time_user: string;
  user: User;
  type: string;
  isOwnLog: boolean;
};

export default OwnLogType;
