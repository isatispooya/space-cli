export interface VerifyType {
  time: string;
  id: number;
  self_status: "approved" | "rejected" | string;
  user: {
    first_name: string;
    last_name: string;
  };
}

export interface VerifyPatchTypes {
  id: number;
  data: {
    self_status: "approved" | "rejected" | "pending";
  };
}
