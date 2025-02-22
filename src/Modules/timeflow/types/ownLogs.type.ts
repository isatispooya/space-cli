import User from "./userLogs.type";

type OwnLog = {
  id: number;
  status_self: string;
  time_user: string;
  user: User;
  type: string;
  isOwnLog: boolean;
};

export default OwnLog;
