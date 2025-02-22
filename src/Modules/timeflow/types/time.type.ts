type User = { first_name: string; last_name: string };

export type Status =
  | "pending"
  | "approved"
  | "rejected"
  | "mission"
  | "leave"
  | "shift_end";

interface TimeEntry {
  id: number;
  user: User;
  type: "login" | "logout";
  time: string;
  status: Status;
  rejectReason?: string;
}

export default TimeEntry;
