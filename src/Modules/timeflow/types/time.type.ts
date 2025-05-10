import { UserType } from "@/Modules/positions/types";


export type StatusType =
  | "pending"
  | "approved"
  | "rejected"
  | "mission"
  | "leave"
  | "shift_end";

export type TimeEntryType = {
  id: number;
  user: UserType;
  type: "login" | "logout";
  time: string;
  status: StatusType;
  rejectReason?: string;
}

export default TimeEntryType;
