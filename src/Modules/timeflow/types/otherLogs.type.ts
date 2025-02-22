import User from "./userLogs.type";

type OtherLog = {
  id: number;
  status_parent: string;
  time_parent: string;
  time_user: string;
  user: User;
  type: string;
  isOwnLog: boolean;
};

export default OtherLog;
